import { Item } from "@prisma/client";

interface CategoryGroup {
    items: Item[];
    amount: number;
}

export type GroupedItems = Record<string, CategoryGroup>;

