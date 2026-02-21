import postModel from '../models/post.model.js'
import likeModel from '../models/like.model.js'
import ImageKit from '@imagekit/nodejs'
import { toFile } from '@imagekit/nodejs'
import jwt from 'jsonwebtoken'


const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})


export const createPostController = async (req,res) =>{

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : req.file.originalname,
        folder:"cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : req.user.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}

export const getPostController = async (req,res)=>{

    const userId = req.user.id;

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

    let userId = req.user.id;
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

export const likePostController = async(req,res)=>{
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!postId){
        return res.status(404).json({
            message:"post does not exist"
        })
    }

    const existingLike = await likeModel.findOne({
        post : postId,
        user : username
    })

    if(existingLike){
        await likeModel.findOneAndDelete({
            post : postId,
            user : username
        })
        return res.status(200).json({
            message : "post unliked"
        })
    }

    const like = await likeModel.create({
        post : postId,
        user : username,
    })

    res.status(200).json({
        message : "Post liked successfully",
        like
    })
}