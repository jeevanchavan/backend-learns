import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

// It creates __dirname manually in ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// require routes
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.static("./public"));
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

console.log(__dirname);

// wildcard api
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
})

export default app;