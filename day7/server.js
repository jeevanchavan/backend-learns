// server start karna

import app from './src/app.js'
import connectDB from './src/config/db.js';
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const port = process.env.PORT;

app.listen(port || 3000,()=>{
    console.log(`server is listening at port ${port}`);
})