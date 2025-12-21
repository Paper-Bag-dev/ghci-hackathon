import express from "express";
import getUser from "../../../controller/user/getUser";
import dispatchAgent from "../../../controller/user/dispatchAgent";

const router = express.Router();

router.get("/", getUser);
router.post("/dispatch", dispatchAgent);

export default router;
