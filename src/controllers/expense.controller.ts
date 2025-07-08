import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { getHighestCategory, getItemsByCategory, getTotalAmount, getTotalCurrentAmount } from "../util";
import { Categories } from "../data";

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
            category: expense.category,
            createdAt: expense.createdAt
        })
    }catch (error){
        res.status(500).json({ message: error })
    }
}

export const modifyExpense = async (req: Request, res: Response) => {
    try {
        const { id, name, amount, category } = req.body
        const data: Record<string, any> = {};

        // include only the needed fields
        if (name !== '') data.name = name;
        if (amount !== '') data.amount = parseInt(amount);
        data.category = category
        
        // update the item
        await prisma.item.update({
            where: { id: id },
            data: data
        })
        
        // find and return the item updated
        const item = await prisma.item.findUnique({
            where: { id: id },
        })
        res.status(201).json(item)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getStats = async (req: Request, res: Response) => {
    try{
        // item with type == 'expenses'
        const expenses = await prisma.item.findMany({
            where: {
                type: 'expenses',
                workSpaceId: req.params.workSpaceId
            },
        });

        const categoryItems = getItemsByCategory(expenses, Categories)
        const totalExpenses = getTotalAmount(expenses)
        const highestCategory = getHighestCategory(categoryItems)
        const totalCurrentExpenses = getTotalCurrentAmount(expenses) 
        
        res.json({ 
            total: totalExpenses,
            highestCategory: highestCategory,
            totalCurrentMonth: totalCurrentExpenses
        })
    }catch (error){
        res.status(500).json({ message: 'Error creating expense' })
    }
}