import express from 'express'
import { errorHandle } from './middleware/error.middleware.js';

const app = express()
app.use(express.json())



import authRouter from './routes/auth.routes.js';
app.use("/api/auth",authRouter)


app.use(errorHandle)
export default app;