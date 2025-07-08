import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createExpense, getExpenses, getStats, modifyExpense } from "../controllers/expense.controller";

const ExpenseRouter = express.Router();

ExpenseRouter.get("/:workSpaceId", authenticate, getExpenses);
ExpenseRouter.get("/stats/:workSpaceId", authenticate, getStats);
ExpenseRouter.post("/", authenticate, createExpense);
ExpenseRouter.patch("/", authenticate, modifyExpense)

export default ExpenseRouter;