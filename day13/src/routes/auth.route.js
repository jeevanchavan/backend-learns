import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import userModel from '../models/user.model.js';

const authRouter = express.Router();

// user register

authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;

    const userAlreadyExits = await userModel.findOne({email});
    
    if(userAlreadyExits){
        return res.status(409).json({     // 409 -> conflicts with existing data
            message:"user already exists with this email",
        })
    }

    // password hashing -> security practices
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name,
        email,
        password:hash
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

// token information
authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message:"this is protected route"
    })
})

// user login

authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        res.status(404).json({        
        message:"user doesn't exists"
    })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
    
    if(!isPasswordMatched){
        res.status(401).json({          // 401 -> unauthorized req
            message:"Invalid Password",
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



export default authRouter;