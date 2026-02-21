import express from "express"
import multer from 'multer'

import { createPostController, getPostController, getPostDetailsController, likePostController } from "../controllers/post.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";

const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();

/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
 */
postRouter.post("/",upload.single("image"),identifyUser,createPostController)

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */
postRouter.get("/",identifyUser,getPostController)

/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId",identifyUser,getPostDetailsController)

/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId",identifyUser,likePostController)

export default postRouter;