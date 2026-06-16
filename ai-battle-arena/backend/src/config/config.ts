import dotenv from 'dotenv'
dotenv.config()

type CONFIG={
    GEMINI_API_KEY: string,
    MISTRAL_API_KEY: string,
    COHERE_API_KEY: string,
}

const config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRAL_API_KEY: process.env.GEMINI_API_KEY || "",
    COHERE_API_KEY: process.env.GEMINI_API_KEY || "",
}

export default config