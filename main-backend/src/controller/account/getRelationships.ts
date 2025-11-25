import { Request, Response } from "express";
import RelationshipModel from "../../models/relationships";

const getRelationships = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const relationships = await RelationshipModel.find({ owner: id })
      .populate("targetUser", "firstName lastName email image")
      .lean();

    return res.status(200).json({
      status: true,
      relationships,
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
