import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  from?: string;
  to?: string;
  amount: number;
  type: string;
  description?: string;
  status: string;
  createdAt?: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    description: String,
    status: { type: String, default: "completed" },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
export default Transaction;
