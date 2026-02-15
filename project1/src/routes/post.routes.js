import express from "express"
import multer from 'multer'

import { createPostController } from "../controllers/post.controller.js";

const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();

// POST : /api/posts

postRouter.post("/",upload.single("image"),createPostController)

export default postRouter;