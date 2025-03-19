import express from "express";
import { getWorkSpaces } from "../controllers/workspace.controller";
import { authenticate } from "../middlewares/auth.middleware";

const workSpaceRouter = express.Router();

workSpaceRouter.get("/", authenticate, getWorkSpaces);

export default workSpaceRouter;