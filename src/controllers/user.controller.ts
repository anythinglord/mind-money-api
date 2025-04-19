import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRandomUID } from "../util";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const verifySession = async (_req: Request, res: Response) => {
    try {
        res.json({ 
            message: 'valid session'  
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

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
            data: { email, password: hashedPassword, username: `user${getRandomUID}` },
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

        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRETR as string, {
            expiresIn: "7d",
        });

        res
            .cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

        res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000  // valid until 5 min
            })
            .json({ 
                message: 'Login successfully', 
                user: {
                    id: user.id, 
                    username: user.username ?? `user${user.id}`,
                    timestamp: (new Date()).toDateString()
                } 
            });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const logout = async (_req: Request, res: Response) => {
    try {
        res.clearCookie('refresh_token')
        res
            .clearCookie('access_token')
            .json({ message: 'Logout successfully', user: null });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}