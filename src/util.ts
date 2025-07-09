import { Item } from '@prisma/client';
import { createHash, randomBytes } from 'crypto';
import { GroupedItems } from './models';

/**
 * Generate a ramdomUID
 * @returns {number} UID
 */
export const getRandomUID = () => {
    const limit = 1000000
    return Math.ceil(Math.random() * limit)
}

/**
 * Generate a simple OTP to recover password
 * @returns {string, Date} { otp, expiresAt }
 */
export const generateOTP = () => {
    // return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
    const buffer = randomBytes(32)
    const otp = (
        parseInt(createHash("sha256").update(buffer).digest("hex"), 16) % 1000000
    ).toString().slice(0,6)
    const expiresAt = new Date(Date.now() + 60 * 1000); // 30 seconds
    return {
        otp: otp.padStart(6, "0"),
        expiresAt
    }
}

/**
 * Get each catergory with its items and total amount
 * @param {Item[]} items 
 * @param {string[]} categories 
 * @returns {GroupedItems} categoryItems
 */
export const getItemsByCategory = (items: Item[], categories: string[]): GroupedItems => {
    const categoryItems: GroupedItems = {}
    categories.map(category => {
        if (!categoryItems[category]) {
            categoryItems[category] = { items: [], amount: 0 };
        }
        const itemsFiltered = items.filter(item => item.category === category)
        categoryItems[category].items = itemsFiltered
        categoryItems[category].amount = getTotalAmount(itemsFiltered)
    })
    return categoryItems
}

/**
 * Get total Amount from items
 * @param {Item[]} items 
 * @returns {number} total
 */
export const getTotalAmount = (items: Item[]) => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0)
}

/**
 * Get Total expenses from the current month
 * @param {Item[]} items 
 * @returns {number} total
 */
export const getTotalCurrentAmount = (items: Item[]) => {
    const currentMonth = new Date().getMonth() + 1
    const currentItems = items.filter(item => item.createdAt.getMonth() + 1 === currentMonth)
    return getTotalAmount(currentItems)
}

/**
 * Returns the Highest category in the grouped Object
 * @param {GroupedItems} grouped 
 * @returns {string} maxKey
 */
export const getHighestCategory = (grouped: GroupedItems) => {
    const [maxKey, _] = Object.entries(grouped).reduce(
        (maxEntry, currentEntry) => {
            const [, maxVal] = maxEntry;
            const [, currVal] = currentEntry;
            return currVal.amount > maxVal.amount ? currentEntry : maxEntry;
        } 
    )
    return maxKey
}
