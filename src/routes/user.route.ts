import { Router } from "express";
import { prisma } from "../config/prisma";

const userRouter = Router();

userRouter.get('/', async (_req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users)
    }catch (error){
        res.status(500).json({ message: error })
    }
})

userRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const newUser = await prisma.user.create({
            data: {
                email: 'test2@email.com',
                password: '123@abc',
            },
            select: {
                email: true,
                password: true,
                createdAt: true,
            },
        })
        res.json(newUser)
    } catch (error){
        res.status(500).json({ message: error })
    }
})

export default userRouter;