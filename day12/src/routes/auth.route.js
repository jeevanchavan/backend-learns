import express from 'express'
import userModel from '../models/user.model.js';

const authRouter = express.Router();

authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;
    const user = await userModel.create({
        name,
        email,
        password
    });

    res.status(201).json({message:"user registered",user})

})

export default authRouter;