import express from "express";
import { signup, login } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;