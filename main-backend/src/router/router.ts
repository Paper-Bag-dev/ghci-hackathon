import express from "express";
import signRouter from "./routes/auth";
import agentRouter from "./routes/agent";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello From Backend Router ~ <3");
});

router.use("/auth", signRouter);
router.use("/agent", agentRouter);
export default router;
