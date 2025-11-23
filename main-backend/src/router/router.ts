import express from "express";
import agentRouter from "./agent";
import publicRouter from "./public/index";
import protectedRouter from "./protected/index";
import errorHandler from "../middlewares/errorHandler";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("here request:", req.method, req.originalUrl);
  next();
});
router.use("/public", publicRouter, errorHandler);
router.use("/protected", requireAuth(), protectedRouter, errorHandler);
router.use("/agents", agentRouter, errorHandler);

export default router;
