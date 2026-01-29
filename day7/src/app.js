import express from 'express'
import noteModel from '../src/models/notesModel.js'

const app = express()

app.use(express.json());

app.post("/notes",async (req,res)=>{
    const {title,desc} = req.body;
    const note = await noteModel.create({
        title,desc
    })
    res.status(201).json(note)
})

app.get("/notes",async (req,res)=>{
    const noteById = await noteModel.find().sort({createdAt:-1});
    res.status(200).json(noteById)
})

app.put("/notes/:id",async (req,res)=>{
    const {title,desc} = req.body;
    const updatedNote = await noteModel.findByIdAndUpdate(req.params.id,{title,desc},{new:true})
    res.status(200).json(updatedNote)
})

app.delete("/notes/:id",async (req,res)=>{
    const {id} = req.params;
    const deleteNote = await noteModel.findByIdAndDelete(id);
    res.status(200).json(deleteNote);
})


export default app;