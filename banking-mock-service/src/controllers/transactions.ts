import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const createTransfer = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    const { fromId, toId, amount, description } = req.body;
    if (!fromId || !toId || !amount)
      return res.status(400).json({ message: "Missing fields" });
    const numeric = Number(amount);
    if (numeric <= 0)
      return res.status(400).json({ message: "Amount must be > 0" });

    session.startTransaction();
    const fromUser = await User.findById(fromId).session(session);
    const toUser = await User.findById(toId).session(session);
    if (!fromUser || !toUser) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User(s) not found" });
    }

    if (fromUser.balance < numeric) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient funds" });
    }

    fromUser.balance -= numeric;
    toUser.balance += numeric;

    await fromUser.save({ session });
    await toUser.save({ session });

    const tx = await Transaction.create(
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
    return res.status(201).json({ transaction: tx[0] });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
