import axios from "axios";
import { Request, Response } from "express";

const rerouteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { url } = req.body;
  await axios.post(`http://localhost:3000/api/stream/${id}`, {
    message: `navigate: ${url}`,
  });
  res.json({
    status: true,
  });
};

export default rerouteUser;
