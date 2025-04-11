import express from "express";
import { createWorkSpace, getWorkSpaces } from "../controllers/workspace.controller";
import { authenticate } from "../middlewares/auth.middleware";

const workSpaceRouter = express.Router();

workSpaceRouter.get("/", authenticate, getWorkSpaces);
workSpaceRouter.post("/", authenticate, createWorkSpace);

export default workSpaceRouter;