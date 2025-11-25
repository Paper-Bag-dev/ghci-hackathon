const reminderStore: any = {};
import axios from "axios";
import { Request, Response } from "express";

const createReminder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reminders } = req.body;

  if (!reminderStore[id]) reminderStore[id] = [];
  reminderStore[id].push(...reminders);

  const reminder = reminders[0];

  try {
    await axios.post(`http://localhost:3000/api/stream/${id}`, {
      message: "reminder:" + JSON.stringify(reminder),
    });
  } catch (err: any) {
    console.error(" Failed to send reminder SSE:", err.message);
  }

  return res.json({
    status: true,
    message: "Reminder saved & pushed.",
    reminder,
  });
};

export default createReminder;