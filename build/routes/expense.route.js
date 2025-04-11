"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const expense_controller_1 = require("../controllers/expense.controller");
const ExpenseRouter = express_1.default.Router();
ExpenseRouter.get("/:workSpaceId", auth_middleware_1.authenticate, expense_controller_1.getExpenses);
ExpenseRouter.post("/", auth_middleware_1.authenticate, expense_controller_1.createExpense);
exports.default = ExpenseRouter;
