import express from 'express'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';

const authRouter = express.Router();

authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;

    const userAlreadyExits = await userModel.findOne({email});
    
    if(userAlreadyExits){
        res.status(409).json({     // 409 -> conflicts with existing data
            message:"user already exists with this email",
        })
    }

    const user = await userModel.create({
        name,
        email,
        password
    });

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })

})

export default authRouter;