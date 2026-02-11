import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import userModel from '../models/user.model.js'

const authRouter = express.Router();

// register api
authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;

    // user already registered or not
    const userAlreadyExists = await userModel.findOne({email});

    if(userAlreadyExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        name,
        email,
        password:hash
    })

    // token creation
    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )
    
    // token inside the cookie
    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

// login api
authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"user not registered"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    // token creation -> 1.user_id
                        //  2.jwt_secret key
    const token = jwt.sign(
        {
            id:user._id,
        },
        process.env.JWT_SECRET,
    )

    res.status(200).json({
        message:"user logged in",
        user
    })
})

export default authRouter