import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import noteModel from './models/NoteModel.js'

const app = express()
dotenv.config()

app.use(express.json())
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

app.patch("/api/notes/:id",async (req,res)=>{
    const {title,description} = req.body;
    const noteUpdated = await noteModel.findByIdAndUpdate(req.params.id,{title,description},{new:true});
    res.status(200).json(noteUpdated);
})

app.delete("/api/notes/:id",async (req,res)=>{
    const {id} = req.params;
    const noteDeleted = await noteModel.findByIdAndDelete(id);
    res.status(200).json(noteDeleted)
})

export default app;