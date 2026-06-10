import { generateChatTitle, generateResponse } from "../services/ai.service.js";

export const sendMessage = async (req,res)=>{
    
    try {
        const {message} = req.body;

        const title = await generateChatTitle(message);

        const result = await generateResponse(message);

        res.json({
            aiMessage:result,
            title
        })

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to generate response"
        });
    }

}