import mongoose from "mongoose";

const connectToDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected Successfully")
    } catch (error) {
        console.log("err connecting mongodb",error);
    }
}

export default connectToDB;