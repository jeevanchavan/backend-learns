import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username must be reauired"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"email must be required"],
        unique:[true,"email must be unnique"]
    },
    password:{
        type:String,
        required: [ true, "Password is required" ],
        select:false
    }
})

const userModel = mongoose.model("users",userSchema)

export default userModel;