import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

import authRouter from './routes/user.routes.js';

app.use('/api/auth',authRouter)

export default app;