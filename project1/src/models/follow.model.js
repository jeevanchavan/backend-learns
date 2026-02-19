import mongoose from "mongoose";


const followSchema = new mongoose.Schema({
    follower:{
        type : String
    },
    following:{
        type : String
    }
},{timestamps : true})

followSchema.index({follower:1,following:1},{unique:true})

const followModel = mongoose.model("follows",followSchema);

export default followModel;