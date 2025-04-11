import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getExpenses = async (req: Request, res: Response) => {
    try{
        // item with type == 'expenses'
        const expenses = await prisma.item.findMany({
            where: {
                type: 'expenses',
                workSpaceId: req.params.workSpaceId
            },
        });
        res.json({ expenses: expenses })
    }catch (error){
        res.status(500).json({ message: 'Error creating expense' })
    }
}

export const createExpense = async (req: Request, res: Response) => {
    try{
        const { name, amount, category } = req.body
        const expense = await prisma.item.create({
            data: { 
                name, amount: parseInt(amount), category, type: 'expenses', 
                workSpaceId: '67f9274880d73be2ade586aa' 
            },
        })
        res.status(201).json({ 
            message: "Expense created successfully",
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            category: expense.category
        })
    }catch (error){
        res.status(500).json({ message: error })
    }
}