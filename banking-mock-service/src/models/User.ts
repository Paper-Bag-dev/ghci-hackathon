import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerk?: Record<string, any>;
  clerkId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  username?: string;
  role?: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    clerk: { type: Schema.Types.Mixed },
    clerkId: { type: String, index: true },
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    image: String,
    username: String,
    role: { type: String, default: "local" },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
