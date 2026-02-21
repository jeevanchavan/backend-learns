import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

// require routes
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// using routes
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)

export default app;