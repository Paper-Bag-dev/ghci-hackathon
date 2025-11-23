import express from "express";
import { getBal } from "../../controller/account/getBal";
import axios from "axios";
import { Error } from "mongoose";

const router = express.Router();
const reminderStore: any = {};

router.use((req, res, next) => {
  console.log("agent request:", req.method, req.originalUrl);
  next();
});

router.get("/balance/:id", getBal);
router.post("/reminder/:id", async (req, res) => {
  const { id } = req.params;
  const { reminders } = req.body;

  if (!reminderStore[id]) reminderStore[id] = [];
  reminderStore[id].push(...reminders);

  const reminder = reminders[0]; // only sending the new one

  try {
    // 🔥 Push reminder to Next.js SSE
    await axios.post(`http://localhost:3000/api/stream/${id}`, {
      message: "reminder:" + JSON.stringify(reminder),
    });
  } catch (err: any) {
    console.error("❌ Failed to send reminder SSE:", err.message);
  }

  return res.json({
    status: true,
    message: "Reminder saved & pushed.",
    reminder,
  });
});
router.get("/ui/:id", async (req, res) => {
  const { id } = req.params;
  await axios.get(`http://localhost:3000/api/ui/${id}`);
  res.json({
    status: true,
  });
});
export default router;
