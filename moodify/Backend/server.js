import dotenv from 'dotenv'
import app from './src/app.js'
import connectToDB from './src/config/db.js'

dotenv.config()

connectToDB()

app.listen(3000,()=>{
    console.log("server is listening at port 3000");
})