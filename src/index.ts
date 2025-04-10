import express from 'express';
import { PORT } from './config';
import userRouter from './routes/user.route';
import cookieParser from "cookie-parser";
import workSpaceRouter from './routes/workspace.route';
import ExpenseRouter from './routes/expense.route';
import cors from "cors";

const app = express()
app.use(cors({
  origin: "http://localhost:5173", // enable only client
  credentials: true, // enable cookies and autenticación
}));
app.use(express.json()) // middleware -> transform the req.body to json
app.use(cookieParser())
app.use("/api/v1/users", userRouter)
app.use("/api/v1/workspaces", workSpaceRouter)
app.use("/api/v1/expenses", ExpenseRouter)

app.listen(PORT, () => {})