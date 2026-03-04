import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        reuired:true
    },
    title:{
        type:String,
        required:true
    },
    mood: {
        type:String,
        enum:{
            values:["sad","happy","surprised"],
            message:"Enum this is"
        }
    }
})

const songModel = mongoose.model("songs",songSchema)

export default songModel