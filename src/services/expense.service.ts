import { prisma } from "../config/prisma";
import { Categories } from "../data";
import { getHighestCategory, getItemsByCategory, getSelectedAmount, getTotalAmount, getUntilTodayAmount } from "../util";

export const getStats  = async (workSpaceId: string, category: string = '') => {
    const expenses = await prisma.item.findMany({
        where: {
            type: 'expenses',
            workSpaceId: workSpaceId
        },
    });
    
    const categoryItems = getItemsByCategory(expenses, Categories)
    const totalExpenses = getTotalAmount(expenses)
    const highestCategory = getHighestCategory(categoryItems)
    const untilTodayAmount = getUntilTodayAmount(expenses)
    let totalSelectedAmount = 0 
    if (category !== '') {
        totalSelectedAmount = getSelectedAmount(expenses, category) 
    }
    
    return{ 
        total: totalExpenses,
        highestCategory: highestCategory,
        untilTodayAmount: untilTodayAmount,
        selectedAmount: totalSelectedAmount
    }
}