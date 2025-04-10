import express from "express";
import { authenticate } from "../middlewares/auth.middleware";

const ExpenseRouter = express.Router();

ExpenseRouter.get("/", authenticate, () => {});
ExpenseRouter.post("/", authenticate, () => {});


export default ExpenseRouter;