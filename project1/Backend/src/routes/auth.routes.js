import express from 'express'
import { getMeController, loginController, registerController } from '../controllers/auth.controller.js';
import {identifyUser} from '../middlewares/auth.middleware.js'


const authRouter = express.Router()

// /api/auth/register

authRouter.post("/register",registerController)

// /api/auth/login
authRouter.post("/login",loginController)

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me", identifyUser, getMeController)

export default authRouter;