import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token must be required"]
    }
},
{
    timestamps:true
})

const blacklistModel = mongoose.model("blacklists",blacklistSchema)

export default blacklistModel