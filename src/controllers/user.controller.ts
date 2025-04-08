import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Verify if the users exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "user already exists" });
            return
        }

        // Verify email structure
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: "bad email" });
            return
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { email, password: hashedPassword, username: `user${Math.random() * 10}` },
        })
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // Verify if the users exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid Email" });
            return
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Password" });
            return
        }

        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });

        res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 // valid until 1 hour
            })
            .json({ 
                message: 'Login successfully', 
                user: {
                    id: user.id, 
                    username: user.username ?? `user${Math.random() * 10}` 
                } 
            });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const logout = async (_req: Request, res: Response) => {
    try {
        res
            .clearCookie('access_token')
            .json({ message: 'Logout successfully', user: null });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}