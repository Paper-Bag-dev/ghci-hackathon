import express from "express";
import fetchUserBalance from "../../../controller/agent/account/fetchUserBalance";
import updateUserBalance from "../../../controller/agent/account/updateUserBalance";

const router = express.Router();

router.get("/accounts/balance/:id", fetchUserBalance);
router.put("/accounts/balance/:id", updateUserBalance);

export default router;
