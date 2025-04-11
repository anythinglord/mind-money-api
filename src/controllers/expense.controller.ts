import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getExpenses = async (req: Request, res: Response) => {
    try{
        
        // item with type == 'expenses'
        /*const expenses = await prisma.item.findMany({
            where: {
                type: 'expenses',
                workSpaceId: req.params.workSpaceId
            },
        });*/
        res.json({ workspace: '' })
    }catch (error){
        res.status(500).json({ message: 'Error creating expense' })
    }
}

export const createExpense = async (_req: Request, res: Response) => {
    try{
        // item with type == 'expenses'
        const expenses = await prisma.item.findMany({
            where: {
                type: 'expenses',
                category: 'books',
            },
        });
        res.json(expenses)
    }catch (error){
        res.status(500).json({ message: error })
    }
}