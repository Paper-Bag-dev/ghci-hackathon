import express from "express";
import publicRouter from "./public/index";
import protectedRouter from "./protected/index";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    route: "/",
  });
});

router.use("/public", publicRouter);
router.use("/protected", protectedRouter);

export default router;
