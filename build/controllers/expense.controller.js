"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = exports.getExpenses = void 0;
const prisma_1 = require("../config/prisma");
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // item with type == 'expenses'
        const expenses = yield prisma_1.prisma.item.findMany({
            where: {
                type: 'expenses',
                workSpaceId: req.params.workSpaceId
            },
        });
        res.json({ expenses: expenses });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating expense' });
    }
});
exports.getExpenses = getExpenses;
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, amount, category } = req.body;
        const expense = yield prisma_1.prisma.item.create({
            data: {
                name, amount: parseInt(amount), category, type: 'expenses',
                workSpaceId: '67f9274880d73be2ade586aa'
            },
        });
        res.status(201).json({
            message: "Expense created successfully",
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            category: expense.category
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createExpense = createExpense;
