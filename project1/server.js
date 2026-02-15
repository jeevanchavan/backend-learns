import 'dotenv/config';

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

console.log("Private key:",process.env.IMAGEKIT_PRIVATE_KEY)


app.listen(3000,()=>{
    console.log("server is listening at port 3000");
})