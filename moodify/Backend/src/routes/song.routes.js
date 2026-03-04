import express from 'express'
import upload from '../middlewares/upload.middleware.js';
import { uploadSong } from '../controllers/song.controller.js';

const songRouter = express.Router()

songRouter.post("/",upload.single("song"),uploadSong)

export default songRouter;