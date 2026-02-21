import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User already exists"],
        required:[true,"username is required"]
    },
    email:{
        type: String,
        unique: [true,"Email already exists"],
        required:[true,"Email is required"],
    },
    password:{
        type: String,
        required:[true,"password is required"],
    },
    bio:{
        type: String
    },
    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/jeevan7273/defaultImage.avif"
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel;