import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const createTransfer = async (req: Request, res: Response) => {
  try {
    const { fromId, toId, amount, description } = req.body;
    if (!fromId || !toId || !amount)
      return res.status(400).json({ message: "Missing fields" });
    const tx = await performTransfer(fromId, toId, Number(amount), description);
    return res.status(201).json({ transaction: tx });
  } catch (error: any) {
    console.error(error);
    if (error && error.status && error.message)
      return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ error: "Server error" });
  }
};

export const performTransfer = async (
  fromId: string,
  toId: string,
  amount: number,
  description?: string
) => {
  const session = await mongoose.startSession();
  try {
    if (!fromId || !toId || !amount)
      throw { status: 400, message: "Missing fields" };
    const numeric = Number(amount);
    if (numeric <= 0) throw { status: 400, message: "Amount must be > 0" };

    session.startTransaction();
    const fromUser = await User.findById(fromId).session(session);
    const toUser = await User.findById(toId).session(session);
    if (!fromUser || !toUser) {
      await session.abortTransaction();
      throw { status: 404, message: "User(s) not found" };
    }

    if (fromUser.balance < numeric) {
      await session.abortTransaction();
      throw { status: 400, message: "Insufficient funds" };
    }

    fromUser.balance -= numeric;
    toUser.balance += numeric;

    await fromUser.save({ session });
    await toUser.save({ session });

    const txs = await Transaction.create(
      [
        {
          from: fromUser._id,
          to: toUser._id,
          amount: numeric,
          type: "transfer",
          description,
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return txs[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const txs = await Transaction.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("from to", "firstName lastName email");
    return res.json(txs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
