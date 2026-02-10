import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';

const app = express()
dotenv.config();


app.use(express.json())

connectDB();

app.use("/api/auth",authRouter)


export default app;