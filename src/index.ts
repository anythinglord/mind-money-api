import express from 'express';
import { PORT } from './config';
import userRouter from './routes/user.route';
import cookieParser from "cookie-parser";
import workSpaceRouter from './routes/workspace.route';

const app = express()
app.use(express.json()) // middleware -> transform the req.body to json
app.use(cookieParser())
app.use("/api/v1/users", userRouter)
app.use("/api/v1/workspaces", workSpaceRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})