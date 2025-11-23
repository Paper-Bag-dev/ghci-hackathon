import { Request, Response } from "express";
import Relationship from "../models/Relationship.js";

export const createRelationship = async (req: Request, res: Response) => {
  try {
    const { userId, relatedUserId, relationType } = req.body;
    if (!userId || !relatedUserId)
      return res.status(400).json({ message: "Missing fields" });
    const rel = await Relationship.create({
      user: userId,
      relatedUser: relatedUserId,
      relationType,
    });
    return res.status(201).json(rel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const listRelationships = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const list = await Relationship.find({ user: userId }).populate(
      "relatedUser",
      "firstName lastName email"
    );
    return res.json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
