import express from "express";
import { signup, login, logout, verifySession, forgotPassword, verifyOtp, resetPassword } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { tempAuthenticate } from "../middlewares/temp.middleware";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.post("/forgot_password", forgotPassword);
userRouter.post("/verify_otp", verifyOtp);
userRouter.post("/reset_password", resetPassword, tempAuthenticate);
userRouter.get("/verify_session", authenticate, verifySession)


export default userRouter;