import axios from "axios";
import { Request, Response } from "express";

export default async function createUICard(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { ui_cards } = req.body;

    if (!ui_cards || !id) return res.status(400).json({ message: "Missing fields" });

    await axios.post(`${process.env.FRONTEND_URL}/api/stream/${id}`, {
      message: "ui_card:" + JSON.stringify(ui_cards),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
