import express from 'express'
import { registerUser } from '../controllers/auth.controller.js';
import { registerValidation } from '../validation/auth.validator.js';

const authRouter = express.Router()

authRouter.post("/register",registerValidation,registerUser)

export default authRouter;