import express from "express";
import userRouter from "./routes/user";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    route: "/public",
  });
});

router.use("/user", userRouter);

export default router;
