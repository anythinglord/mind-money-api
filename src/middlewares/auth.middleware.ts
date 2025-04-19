import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const token = req.cookies.access_token
    const refreshToken = req.cookies.refresh_token

    if (!token)  {
        if (!refreshToken) {
            res.status(403).json({ message: "Access not authorized" });
            return
        }
    }

    try {
        const goodToken = token ?? refreshToken
        const secret = token ? process.env.JWT_SECRET : process.env.JWT_SECRETR
        const decoded = jwt.verify(goodToken, secret as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
