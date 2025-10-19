import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createExpense, getExpenses, getExpensesStats, modifyExpense } from "../controllers/expense.controller";

const ExpenseRouter = express.Router();

ExpenseRouter.get("/:workSpaceId", authenticate, getExpenses);
ExpenseRouter.get("/stats/:workSpaceId", authenticate, getExpensesStats);
ExpenseRouter.post("/", authenticate, createExpense);
ExpenseRouter.patch("/", authenticate, modifyExpense)

export default ExpenseRouter;