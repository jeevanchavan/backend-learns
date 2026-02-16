import express from "express"
import multer from 'multer'

import { createPostController, getPostController, getPostDetailsController } from "../controllers/post.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";

const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();

// POST : /api/posts/

postRouter.post("/",upload.single("image"),identifyUser,createPostController)

// GET : /api/posts/
postRouter.get("/",identifyUser,getPostController)

//  GET : /api/posts/details?postId
postRouter.get("/details/:postId",identifyUser,getPostDetailsController)

export default postRouter;