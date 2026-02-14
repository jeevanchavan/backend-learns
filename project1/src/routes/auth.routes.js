import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import userModel from '../models/user.model.js'

const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
    try {
        const {username,email,password,bio,profileImage} = req.body;

        const isUserAlreadyExists = await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        });

        if(isUserAlreadyExists){
            return res.status(409).json({
                message:"user already exists"+ (isUserAlreadyExists.email ===
                 email) ? "email already exsists" : "username already exists"
            })
        }

        const hash = crypto.createHash("sha256").update(password).digest("hex")

        const user = await userModel.create({
            username,
            email,
            password:hash,
            bio,
            profileImage
        })

        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("jwt_token",token)

        res.status(201).json({
            message:"user registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            },
            token
        })
    } catch (error) {
        res.status(404).json(
            error.message
        )
    }
})

export default authRouter;