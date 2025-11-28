import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createIncome } from "../controllers/budget.controller";

const BudgetRouter = express.Router();

BudgetRouter.post("/", authenticate, createIncome);

export default BudgetRouter;