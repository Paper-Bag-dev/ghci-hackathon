import express from "express";

const router = express.Router();

router.post("/sign-in", sigIn);
router.put("/sign-up", signUp);

export default router;
