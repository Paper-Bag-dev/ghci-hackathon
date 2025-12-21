import { Request, Response } from "express";
import RelationshipModel from "../../models/relationships";
import UserModel from "../../models/user";

const createRelationship = async (req: Request, res: Response) => {
  try {
    const ownerClerkId = req.params.id;
    const { receiver_identifier } = req.body;

    if (!ownerClerkId || !receiver_identifier) {
      return res.status(400).json({
        status: false,
        message: "ownerId and receiver_identifier are required",
      });
    }

    const owner = await UserModel.findOne({ clerkId: ownerClerkId });
    if (!owner) {
      return res.status(404).json({ status: false, message: "Owner not found" });
    }

    const receiver = await UserModel.findOne({
      $or: [
        { email: receiver_identifier.toLowerCase() },
        { phone: receiver_identifier },
        { accountId: receiver_identifier }
      ],
    });

    if (!receiver) {
      return res.status(404).json({
        status: false,
        message: "Receiver not found",
      });
    }

    const existing = await RelationshipModel.findOne({
      owner: owner._id,
      targetUser: receiver._id,
    });

    if (existing) {
      return res.status(409).json({
        status: false,
        message: "Relationship already exists",
      });
    }

    const nickname = receiver.firstName ?? receiver.email.split("@")[0];

    const relationship = await RelationshipModel.create({
      owner: owner._id,
      ownerClerkId: owner.clerkId,
      targetUser: receiver._id,
      targetClerkId: receiver.clerkId,
      nickname: nickname.trim().toLowerCase(),
    });

    return res.status(201).json({
      status: true,
      message: "Relationship created successfully",
      relationship,
    });
  } catch (error) {
    console.error("Error creating relationship:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default createRelationship;
