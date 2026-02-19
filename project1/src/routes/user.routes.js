import express from 'express'
import { followUserContoller, unfollowUserController } from '../controllers/user.controller.js'
import { identifyUser } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.post("/follow/:username",identifyUser,followUserContoller)
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController)

export default userRouter