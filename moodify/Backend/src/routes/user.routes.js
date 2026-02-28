import express from 'express'
import { getMeUser, loginUser, logoutUser, registerUser,  } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register',registerUser)

authRouter.post('/login',loginUser)

authRouter.get('/get-me',authMiddleware,getMeUser)

authRouter.get('/logout',logoutUser)

export default authRouter;