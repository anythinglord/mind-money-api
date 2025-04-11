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

export const createWorkSpace = async (req: Request, res: Response) => {
    try{
        console.log('hi from there')
        const { name } = req.body
        
        // Verify if the users exists
        const existingWorkSpace = await prisma.workSpace.findFirst({ where: { userId: '67e418dc01973b02a0c004cb' } });
        if (existingWorkSpace) {
            res.status(400).json({ message: "WorkSpace already exists" });
            return
        }

        await prisma.workSpace.create({
            data: { name, userId: '67e418dc01973b02a0c004cb' },
        })
        res.status(201).json({ message: "WorkSpace created successfully" })
    }catch (error){
        res.status(500).json({ message: error })
    }
}