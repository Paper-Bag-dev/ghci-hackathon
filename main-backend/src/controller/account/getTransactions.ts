import axios from "axios";
import { Request, Response } from "express";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${process.env.MOCK_BANK_API}/api/${id}`);
    if (data) {
      return res.status(200).json({
        status: true,
        transactions: data.transactions,
      });
    }

    res.status(503).json({
      status: false,
      message: "Bank server failed to return response. May be down.",
    });
  } catch (e) {
    console.log("Error fetching transactions!", e);
  }
};

export default getTransactions;
