"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import diaryRouter from './routes/diaries'
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware -> transform the req.body to json
const PORT = 3000;
app.get('/ping', (_req, res) => {
    res.send('pong');
});
//app.use('/api/diaries', diaryRouter)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
