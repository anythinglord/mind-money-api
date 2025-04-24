import express from "express";
import { signup, login, logout, verifySession, verifyEmail } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/verify_email", verifyEmail);
userRouter.get("/verify_session", authenticate, verifySession)


export default userRouter;