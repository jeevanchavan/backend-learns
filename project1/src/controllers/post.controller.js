import postModel from '../models/post.model.js'
import ImageKit from '@imagekit/nodejs'
import { toFile } from '@imagekit/nodejs'


const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

export const createPostController = async (req,res) =>{
    console.log(req.body,req.file)

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : req.file.originalname,
    })

    res.send(file)
}