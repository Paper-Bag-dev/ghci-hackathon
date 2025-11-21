import express from "express";
import userRouter from "./routes/user";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    route: "/protected",
  });
});
router.use("/user", requireAuth(), userRouter);

export default router;
