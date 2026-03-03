import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required : [true,'post id is required to save']
    },
    user:{
        type: String,
        required : [true,'user is required to save the post']
    }
},{timestamps:true})

saveSchema.index({post:1,user:1},{unique:true})

const saveModel = mongoose.model("saves",saveSchema)

export default saveModel