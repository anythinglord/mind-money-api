import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { getStats } from "../services/expense.service"

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
        console.log(error)
        res.status(500).json({ message: 'Error getting expenses' })
    }
}

export const createExpense = async (req: Request, res: Response) => {
    try{
        const { name, amount, category, validAt, recurrence } = req.body
        const workSpaceId = '67f9274880d73be2ade586aa'
        const expense = await prisma.item.create({
            data: { 
                name, amount: parseInt(amount), category, 
                validAt: new Date(validAt), recurrence,
                type: 'expenses', workSpaceId: workSpaceId
            },
        })
        res.status(201).json({ 
            message: "Expense created successfully",
            data: {
                item: {
                    id: expense.id,
                    name: expense.name,
                    amount: expense.amount,
                    category: expense.category,
                    createdAt: expense.createdAt,
                    validAt: expense.validAt,
                    recurrence: expense.recurrence
                },
                stats: await getStats(workSpaceId, '')
            }
        })
    }catch (error){
        console.log(error)
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

export const getExpensesStats = async (req: Request, res: Response) => {
    try{
        const workSpaceId = req.params.workSpaceId
        const categoryQuery = req.query.category as string;
        const category: string = categoryQuery
        const expensesStats = await getStats(workSpaceId, category)
        res.status(201).json(expensesStats)
    }catch (error){
        res.status(500).json({ message: 'Error getting expense stats' })
    }
}