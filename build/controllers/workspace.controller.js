"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkSpace = exports.getWorkSpaces = void 0;
const prisma_1 = require("../config/prisma");
const getWorkSpaces = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workspaces = yield prisma_1.prisma.workSpace.findMany();
        res.json(workspaces);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getWorkSpaces = getWorkSpaces;
const createWorkSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        // Verify if the workspace exists
        const existingWorkSpace = yield prisma_1.prisma.workSpace.findFirst({ where: { userId: '67e418dc01973b02a0c004cb' } });
        if (existingWorkSpace) {
            res.status(400).json({ message: "WorkSpace already exists" });
            return;
        }
        yield prisma_1.prisma.workSpace.create({
            data: { name, userId: '67e418dc01973b02a0c004cb' },
        });
        res.status(201).json({ message: "WorkSpace created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createWorkSpace = createWorkSpace;
