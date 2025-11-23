import { Request, Response } from "express";
import User from "../models/User.js";

export const getBalance = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      "firstName lastName email balance"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ balance: user.balance, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, image, username, balance } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });
    const user = await User.create({
      email,
      firstName,
      lastName,
      image,
      username,
      balance: Number(balance) || 0,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
