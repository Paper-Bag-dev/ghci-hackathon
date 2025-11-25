import axios from "axios";
import { Request, Response } from "express";

const rerouteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await axios.get(`http://localhost:3000/api/ui/${id}`);
  res.json({
    status: true,
  });
};

export default rerouteUser;
