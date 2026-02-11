import app from "./src/app.js";
import dotenv from 'dotenv'
import connectDB from "./src/config/db.js";

dotenv.config()

connectDB();

app.listen(3000,()=>{
    console.log("server is listening at port 3000");
})