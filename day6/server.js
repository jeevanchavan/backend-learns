// server start karna

import app from './src/app.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY");
        
    } catch (error) {
        console.error("error connecting database",error);
    }

}
connectDB()




app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(3000,()=>{
    console.log("app is listening at port 3000");
})