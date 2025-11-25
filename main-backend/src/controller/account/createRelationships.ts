import { Request, Response } from "express";
import RelationshipModel from "../../models/relationships";

const createRelationship = async (req: Request, res: Response) => {
  try {
    const ownerId = req.params.id;
    const { nickname, receiverId } = req.body;

    if (!ownerId || !nickname || !receiverId) {
      return res.status(400).json({
        status: false,
        message: "ownerId, nickname, and receiverId are required",
      });
    }

    const exists = await RelationshipModel.findOne({
      owner: ownerId,
      nickname: nickname.trim().toLowerCase(),
    });

    if (exists) {
      return res.status(409).json({
        status: false,
        message: "Nickname already exists for this user",
      });
    }

    const relationship = await RelationshipModel.create({
      owner: ownerId,
      targetUser: receiverId,
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
