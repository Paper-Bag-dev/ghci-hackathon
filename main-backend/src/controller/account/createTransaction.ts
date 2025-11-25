import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user";
import axios from "axios";

const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, toId, amount } = req.body;
    const user = await UserModel.findOne({ clerkId: id });

    if (!user)
      return res.status(400).json({
        status: false,
        message: "User doesnt exist",
      });

    const transferAmount = await axios.post(
      `${process.env.MOCK_BANK_API}/api/transactins/transfer`,
      {
        fromId: id,
        toId,
        amount,
        description: "AI initiated",
      }
    );

    if (transferAmount.data.status === 200) {
      return res.status(200).json({
        status: true,
        message: "Transaction successful",
      });
    }

    return res.status(503).json({
      status: false,
      message: "Error calling the bank api",
    });
  } catch (error) {
    console.log("Error in create transaction: ", error);
    next();
  }
};

export default createTransaction;
