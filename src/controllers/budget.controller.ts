import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { getBudgetStats } from "../services/budget.service";

export const getIncomes = async (req: Request, res: Response) => {
    try {
        // item with type == 'incomes'
        const incomes = await prisma.item.findMany({
            where: {
                type: 'incomes',
                workSpaceId: req.params.workSpaceId
            },
        });
        res.json({ incomes: incomes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting incomes' })
    }
}

export const createIncome = async (req: Request, res: Response) => {
    try {
        const { name, amount, validAt, recurrence } = req.body
        const workSpaceId = '67f9274880d73be2ade586aa'
        const income = await prisma.item.create({
            data: {
                name, amount: parseInt(amount),
                validAt: new Date(validAt), recurrence,
                type: 'incomes', workSpaceId: workSpaceId
            },
        })
        res.status(201).json({
            message: "income created successfully",
            data: {
                item: {
                    id: income.id,
                    name: income.name,
                    amount: income.amount,
                    createdAt: income.createdAt,
                    validAt: income.validAt,
                    recurrence: income.recurrence
                },
                //stats: await getStats(workSpaceId, '')
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

export const getBudgetStatsController = async (req: Request, res: Response) => {
    try {
        const workSpaceId = req.params.workSpaceId
        const budgetStats = await getBudgetStats(workSpaceId)
        res.status(200).json(budgetStats)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting budget stats' })
    }
}