import { prisma } from "../config/prisma";
import { getTotalAmount } from "../util";

export const getBudgetStats = async (workSpaceId: string) => {
    // Get all income items
    const incomes = await prisma.item.findMany({
        where: {
            type: 'incomes',
            workSpaceId: workSpaceId
        },
    });

    // Get all expense items
    const expenses = await prisma.item.findMany({
        where: {
            type: 'expenses',
            workSpaceId: workSpaceId
        },
    });

    const totalIncome = getTotalAmount(incomes);
    const totalExpenses = getTotalAmount(expenses);
    const savings = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        savings
    };
}
