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

export const getPostController = async (req,res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }

    let decoded =null;

    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"token invalid"
        })
    }
    console.log(decoded)

    const userId = decoded.id;

    const posts = await postModel.find({
        user : userId,
    })

    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}

// post details api
export const getPostDetailsController = async(req,res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        res.status(401).json({
            message:"Token invalid"
        })
    }

    let userId = decoded.id;
    let postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Post fetched Successfully",
        post
    })
}