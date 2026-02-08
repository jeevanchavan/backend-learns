import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

import connectDB from './config/db.js'
import noteModel from './models/NoteModel.js'

// It creates __dirname manually in ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
dotenv.config()

app.use(express.static("./public"));
app.use(express.json())
app.use(cors())

connectDB()



// api

app.post("/api/notes", async(req,res)=>{
    const {title,description} = req.body;
    const noteCreated = await noteModel.create({
        title,
        description
    })
    res.status(201).json(noteCreated)
})

app.get("/api/notes",async (req,res)=>{
    const getAllNotes = await noteModel.find()
    res.status(200).json(getAllNotes)
})

app.put("/api/notes/:id",async (req,res)=>{
    const {title,description} = req.body;
    const noteUpdated = await noteModel.findByIdAndUpdate(req.params.id,{title,description},{new:true});
    res.status(200).json(noteUpdated);
})

app.delete("/api/notes/:id",async (req,res)=>{
    const {id} = req.params;
    const noteDeleted = await noteModel.findByIdAndDelete(id);
    res.status(200).json(noteDeleted)
})
console.log(__dirname);

// wildcard api
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
})

export default app;