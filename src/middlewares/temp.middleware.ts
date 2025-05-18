import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const tempAuthenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const token = req.cookies.temp_token
    
    if (!token)  {
        res.status(403).json({ message: "Access not authorized" });
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
