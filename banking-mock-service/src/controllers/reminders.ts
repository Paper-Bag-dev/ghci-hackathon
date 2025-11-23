import { Request, Response } from "express";
import Reminder from "../models/Reminder.js";

export const createReminder = async (req: Request, res: Response) => {
  try {
    const { userId, title, dueDate, amount } = req.body;
    if (!userId || !title)
      return res.status(400).json({ message: "Missing fields" });
    const reminder = await Reminder.create({
      user: userId,
      title,
      dueDate,
      amount,
    });
    return res.status(201).json(reminder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const listReminders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const reminders = await Reminder.find({ user: userId }).sort({
      dueDate: 1,
    });
    return res.json(reminders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
