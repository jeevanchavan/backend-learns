import express from 'express'
import upload from '../middlewares/upload.middleware.js';
import { getSong, uploadSong } from '../controllers/song.controller.js';

const songRouter = express.Router()

songRouter.post("/",upload.single("song"),uploadSong)
songRouter.get("/",getSong)

export default songRouter;