import express from "express";
import { getBal } from "../../controller/account/getBal";
import createReminder from "../../controller/agent/reminders/createReminder";
import rerouteUser from "../../controller/agent/ui/rerouteUser";
import createTransaction from "../../controller/account/createTransaction";
import getTransactions from "../../controller/account/getTransactions";
import createRelationship from "../../controller/account/createRelationships";
import getRelationships from "../../controller/account/getRelationships";
import createUICard from "../../controller/ui/createUICard";
import getUICard from "../../controller/ui/getUICard";

const router = express.Router();

router.use((req, res, next) => {
  console.log("agent request:", req.method, req.originalUrl);
  next();
});

router.get("/balance/:id", getBal);
router.post("/reminder/:id", createReminder);
router.post("/ui/:id", rerouteUser);

router.get("/transaction/:id", getTransactions);
router.post("/transaction/create", createTransaction);
router.get("/relationship/:id", getRelationships);
router.post("/relationship/:id/create", createRelationship);

router.get("/uichips", getUICard);
router.post("/uichips/:id", createUICard);
export default router;
