import express from 'express'
import { loginController, registerController } from '../controllers/auth.controller.js';


const authRouter = express.Router()

// /api/auth/register

authRouter.post("/register",registerController)

// /api/auth/login
authRouter.post("/login",loginController)

export default authRouter;