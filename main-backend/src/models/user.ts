import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  role: "local" | "google";
  password?: string;
  googleId?: string;

  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
    },

    password: {
      type: String,
      select: false,
      // Custom validator instead of broken required()
      validate: {
        validator: function (value: string) {
          // Local users MUST have password
          if (this.role === "local") return !!value;
          // Google users MUST NOT need a password
          return true;
        },
        message: "Password is required for local users",
      },
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
