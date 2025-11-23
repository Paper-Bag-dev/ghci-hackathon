import { Request, Response } from "express";
import Relationship from "../models/Relationship.js";
import User from "../models/User.js";
import { performTransfer } from "./transactions.js";

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

// Send money to a relationship or directly to a related user.
// Body may include: { fromId, relationshipId } OR { fromId, relatedUserId } OR { fromId, identifier }
// 'identifier' can be an email or username to find the recipient when id is not available.
export const sendToRelationship = async (req: Request, res: Response) => {
  try {
    const {
      fromId,
      relationshipId,
      relatedUserId,
      identifier,
      amount,
      description,
    } = req.body as any;
    if (!fromId || !amount)
      return res
        .status(400)
        .json({ message: "Missing fields (fromId, amount)" });

    let toUser: any = null;

    if (relationshipId) {
      const rel = await Relationship.findById(relationshipId).populate(
        "relatedUser",
        "_id email firstName lastName username"
      );
      if (!rel)
        return res.status(404).json({ message: "Relationship not found" });
      toUser = rel.relatedUser;
    } else if (relatedUserId) {
      toUser = await User.findById(relatedUserId).select(
        "_id email firstName lastName username"
      );
      if (!toUser)
        return res.status(404).json({ message: "Related user not found" });
    } else if (identifier) {
      // try by email then username
      toUser = await User.findOne({ email: identifier }).select(
        "_id email firstName lastName username"
      );
      if (!toUser) {
        toUser = await User.findOne({ username: identifier }).select(
          "_id email firstName lastName username"
        );
      }
      if (!toUser)
        return res
          .status(404)
          .json({ message: "Recipient not found by identifier" });
    } else {
      return res
        .status(400)
        .json({
          message: "Provide relationshipId, relatedUserId, or identifier",
        });
    }

    // prevent sending to self
    if (toUser._id.toString() === fromId)
      return res.status(400).json({ message: "Cannot send to self" });

    const tx = await performTransfer(
      fromId,
      toUser._id.toString(),
      Number(amount),
      description
    );
    return res.status(201).json({ transaction: tx });
  } catch (error: any) {
    console.error(error);
    if (error && error.status && error.message)
      return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ error: "Server error" });
  }
};
