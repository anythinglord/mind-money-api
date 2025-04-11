"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workspace_controller_1 = require("../controllers/workspace.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const workSpaceRouter = express_1.default.Router();
workSpaceRouter.get("/", auth_middleware_1.authenticate, workspace_controller_1.getWorkSpaces);
workSpaceRouter.post("/", auth_middleware_1.authenticate, workspace_controller_1.createWorkSpace);
exports.default = workSpaceRouter;
