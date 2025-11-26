import { Request, Response } from "express";
import RelationshipModel from "../../models/relationships";
import UserModel from "../../models/user";

const getRelationships = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }
    const user = await UserModel.findOne({ clerkId: id });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const relationships = await RelationshipModel.find({ owner: user._id })
      .populate("targetUser", "firstName lastName email image")
      .lean();

    if (!relationships) {
      return res.status(404).json({
        status: false,
        message: "No relationships found or exists for this user.",
      });
    }

    return res.status(200).json({
      status: true,
      relationships: relationships.map((rel) => {
        return {
          owner: rel.ownerClerkId,
          targetUserNickname: rel.nickname,
          targetUserClerkId: rel.targetClerkId,
        };
      }),
    });
  } catch (error) {
    console.error("Error fetching relationships:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch relationships",
    });
  }
};

export default getRelationships;
