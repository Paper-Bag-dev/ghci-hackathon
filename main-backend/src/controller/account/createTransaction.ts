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
    console.log(id, toId, amount);
    const user = await UserModel.findOne({ clerkId: id });
    if (!user)
      return res.status(400).json({
        status: false,
        message: "User doesnt exist",
      });

    let transferAmount;
    try {
      transferAmount = await axios.post(
        `${process.env.MOCK_BANK_API}/api/transactions/transfer`,
        {
          fromId: id,
          toId,
          amount,
          description: "AI initiated",
        }
      );
    } catch (err: any) {
      console.log("BANK ERROR:", err.response?.data || err.message);
      return res.status(err.response?.status || 500).json({
        status: false,
        message: err.response?.data?.message || "Bank API Error",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Transaction successful",
      transaction: transferAmount.data.transaction,
    });
  } catch (error) {
    console.log("Error in create transaction: ", error);
    next();
  }
};

export default createTransaction;
