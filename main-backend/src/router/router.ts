import express from "express";
import signRouter from "./routes/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello From Backend Router ~ <3");
});

router.use("/auth", signRouter);
export default router;
