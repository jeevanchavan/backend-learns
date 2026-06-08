import "dotenv/config"
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";
import { tavily } from "@tavily/core";

const emailTool = tool(
    sendEmail,
    {
        name:"emailTool",
        description:"use this tool to send email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })

    }
)

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

const result = await tvly.search("latest AI news");
console.log(result);

const searchTool = tool(
  async ({ query }) => {
    const result = await tvly.search(query);
    return JSON.stringify(result.results);
  },
  {
    name: "searchTool",
    description: "Search the web for current information",
    schema: z.object({
      query: z.string(),
    }),
  }
);

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-small-latest",
})

const agent = createAgent({
    model,
    tools:[emailTool,searchTool]
})

const messages = []

while(true){
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages[ response.messages.length - 1 ])



    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
}