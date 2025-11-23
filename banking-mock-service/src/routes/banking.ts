import express from "express";
import * as Accounts from "../controllers/accounts.js";
import * as Transactions from "../controllers/transactions.js";
import * as Reminders from "../controllers/reminders.js";
import * as Relationships from "../controllers/relationships.js";

const router = express.Router();

// Accounts
router.get("/accounts/:userId/balance", Accounts.getBalance);
router.get("/accounts/:userId", Accounts.getUser);
router.post("/accounts", Accounts.createUser);

// Transactions
router.post("/transactions/transfer", Transactions.createTransfer);
router.get("/transactions/:userId", Transactions.getTransactions);

// Reminders
router.post("/reminders", Reminders.createReminder);
router.get("/reminders/:userId", Reminders.listReminders);

// Relationships
router.post("/relationships", Relationships.createRelationship);
router.get("/relationships/:userId", Relationships.listRelationships);
router.post("/relationships/transfer", Relationships.sendToRelationship);

export default router;
