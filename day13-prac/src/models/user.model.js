import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:[true,"This email already exsists"]
    },
    password:{
        type:String
    }
})

const userModel = mongoose.model("users",userSchema)
export default userModel