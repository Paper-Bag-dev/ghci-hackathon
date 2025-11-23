import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

export const getBal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // const user = await UserModel.findOne({ clerkId: id });

    // if (!user) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "User not found.",
    //   });
    // }
    console.log("Testd");
    return res.json({
      status: true,
      balance: "567 $",
      message: `This is the user's current account balance stored in our internal database.`,
    });
  } catch (error) {
    console.log("Error - getBal:", error);
    next(error);
  }
};
