import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"With this email user alresy exists"]
    },
    password:String
})

export default mongoose.model("users",userSchema)