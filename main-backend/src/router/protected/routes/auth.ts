import express from "express";
import signUp from "../../../controller/auth/signUp/signUp";
import signIn from "../../../controller/auth/signIn/signIn";
import { signInGoogle } from "../../../controller/auth/google/signIn";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google/signin", signInGoogle);

export default router;
