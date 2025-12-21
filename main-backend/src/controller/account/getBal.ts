import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";
import axios from "axios";

export const getBal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(
      `${process.env.MOCK_BANK_API}/api/accounts/${id}/balance`
    );

    return res.json({
      status: true,
      balance: data.balance,
      message: `This is the user's current account balance stored in the bank db.`,
    });
  } catch (error) {
    console.log("Error - getBal:", error);
    next(error);
  }
};
