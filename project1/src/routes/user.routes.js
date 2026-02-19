import express from 'express'
import { followUserContoller, unfollowUserController } from '../controllers/user.controller.js'
import { identifyUser } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser,followUserContoller)

/** 
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController)

export default userRouter