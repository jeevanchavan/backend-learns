import express from 'express'

const app = express()  /* server create ho jata hai*/

app.use(express.json());

const notes = []

// GET route
app.get("/notes",(req,res)=>{
    res.send(notes);
})

// POST -> create route
app.post("/notes",(req,res)=>{
    const noteCreated = req.body;
    notes.push(noteCreated);
    console.log(req.body);

    res.send("notes created");
})

// DELETE -> route
app.delete("/notes/:id",(req,res)=>{
    delete notes[req.params.id]

    res.send("note deleted");
})

// PATCH -> update route
app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].description = req.body.description;
    res.send("description updated successfully")
})

export default app;