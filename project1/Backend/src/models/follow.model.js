import mongoose from "mongoose";


const followSchema = new mongoose.Schema({
    follower:{
        type : String
    },
    following:{
        type : String
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: [ "pending", "accepted", "rejected" ],
            message: "status can only be pending, accepted or rejected"
        }
    }
},{timestamps : true})

followSchema.index({follower:1,following:1},{unique:true})

const followModel = mongoose.model("follows",followSchema);

export default followModel;