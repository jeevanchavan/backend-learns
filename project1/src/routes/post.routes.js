import express from "express"
import multer from 'multer'

import { createPostController, getPostController, getPostDetailsController } from "../controllers/post.controller.js";

const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();

// POST : /api/posts/

postRouter.post("/",upload.single("image"),createPostController)

// GET : /api/posts/
postRouter.get("/",getPostController)

//  GET : /api/posts/details?postId
postRouter.get("/details/:postId",getPostDetailsController)

export default postRouter;