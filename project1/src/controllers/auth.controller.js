import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import userModel from '../models/user.model.js'

export const registerController = async (req,res)=>{
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

        const hash = bcrypt.hash(password,10)

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

        res.cookie("token",token)

        res.status(201).json({
            message:"user registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            }
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const loginController = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        
        const user = await userModel.findOne({
            $or:[
                {
                    username:username
                },
                {
                    email:email
                }
            ]
        })

        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        
        if(!isPasswordValid){
            res.status(401).json({
                message:"password invalid"
            })
        }

        const token = jwt.sign(
            { 
                id: user._id 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: "1d" 
            }
        )

        res.cookie("token", token)

        res.status(200).json({
            message:"user loggedIn successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            }
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}