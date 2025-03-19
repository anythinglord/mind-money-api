import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getWorkSpaces = async (_req: Request, res: Response) => {
    try{
        const workspaces = await prisma.workSpace.findMany();
        res.json(workspaces)
    }catch (error){
        res.status(500).json({ message: error })
    }
}