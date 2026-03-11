import 'dotenv/config'
import app from "./src/app.js";
import connectToDB from './src/config/db.js';

const PORT = process.env.PORT || 3000;

connectToDB()
    .catch((err)=>{
        console.log("error connecting mongodb",err)
        process.exit(1)
    });


app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
})