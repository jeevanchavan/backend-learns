import postModel from '../models/post.model.js'
import ImageKit from '@imagekit/nodejs'
import { toFile } from '@imagekit/nodejs'
import jwt from 'jsonwebtoken'


const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

export const createPostController = async (req,res) =>{
    // console.log(req.body,req.file)

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not provided, Unauthorized access"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"user not authorized"
        })
    }
    console.log(decoded)

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : req.file.originalname,
        folder:"cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : decoded.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}