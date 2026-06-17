import express from 'express'
import useGraph from './services/graph.ai.service.js'

const app = express()

app.get("/health",(req,res)=>{
    res.json({
        message:"All Good"
    })
})

app.post("/use-graph",async (req,res)=>{
    await useGraph("Write the code for majority element in an array in javascript and how many ways to find the majority element?")
})

export default app;