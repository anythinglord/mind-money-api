import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createIncome, getIncomes, getBudgetStatsController } from "../controllers/budget.controller";

const BudgetRouter = express.Router();

BudgetRouter.get("/:workSpaceId", authenticate, getIncomes);
BudgetRouter.get("/stats/:workSpaceId", authenticate, getBudgetStatsController);
BudgetRouter.post("/", authenticate, createIncome);

export default BudgetRouter;