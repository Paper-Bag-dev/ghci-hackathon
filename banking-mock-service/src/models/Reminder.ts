import mongoose, { Schema, Document } from "mongoose";

export interface IReminder extends Document {
  user: string;
  title: string;
  dueDate?: Date;
  amount?: number;
  isPaid?: boolean;
  createdAt?: Date;
}

const ReminderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    dueDate: Date,
    amount: Number,
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Reminder = mongoose.model<IReminder>("Reminder", ReminderSchema);
export default Reminder;
