import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createExpense, getExpenses } from "../controllers/expense.controller";

const ExpenseRouter = express.Router();

ExpenseRouter.get("/:workSpaceId", authenticate, getExpenses);
ExpenseRouter.post("/", authenticate, createExpense);

export default ExpenseRouter;