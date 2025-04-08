import express from "express";
import { signup, login, logout } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;