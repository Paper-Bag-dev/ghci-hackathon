import express from "express";
import { getBal } from "../../controller/account/getBal";
import createReminder from "../../controller/agent/reminders/createReminder";
import rerouteUser from "../../controller/agent/ui/rerouteUser";
import createTransaction from "../../controller/account/createTransaction";
import getTransactions from "../../controller/account/getTransactions";
import createRelationship from "../../controller/account/createRelationships";
import getRelationships from "../../controller/account/getRelationships";

const router = express.Router();

router.use((req, res, next) => {
  console.log("agent request:", req.method, req.originalUrl);
  next();
});

router.get("/balance/:id", getBal);
router.post("/reminder/:id", createReminder);
router.get("/ui/:id", rerouteUser);

router.get("/transaction/:id", getTransactions);
router.post("/transaction/create", createTransaction);
router.get("/relationship/:id", getRelationships);
router.post("/relationship", createRelationship);

router.get("/uichips");
router.post("/uichips");
export default router;
