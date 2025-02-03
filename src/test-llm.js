import 'dotenv/config';
import { ChatOpenAI } from "@langchain/openai";

// Initialize the chat model
const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
});

async function testLLM() {
    console.log("Testing LLM connection...");
    try {
        const response = await model.invoke("Say hello!");
        console.log("Response:", response);
        console.log("LLM connection successful!");
    } catch (error) {
        console.error("Error:", error.message);
        if (error.message.includes("API key")) {
            console.log("\nMake sure to set your OpenAI API key in .env file:");
            console.log("OPENAI_API_KEY='your-key-here'");
        }
    }
}

testLLM(); 