import express from "express";

const router = express.Router();

router.get("/user/:id", fetchDeets);
router.put("/user/:id", updateDeets);

export default router;
