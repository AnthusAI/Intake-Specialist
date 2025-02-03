import 'dotenv/config';
import { ChatOpenAI } from "@langchain/openai";
import { SYSTEM_PROMPT, HUMAN_PROMPT } from './prompts.js';

// Initialize the chat model
const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
});

// Mock tools for testing
const MOCK_TOOLS = `
- read_state: Check current information
- update_state: Save new information
- validate_completeness: Check what's still needed
`;

async function testPrompt() {
    console.log("Testing prompt template...");
    try {
        // Replace placeholders in the prompt
        const filledPrompt = SYSTEM_PROMPT.replace("{tools}", MOCK_TOOLS);
        
        // Create a test message
        const message = "Hi there! I'm interested in discussing financing options.";
        
        // Send to LLM
        const response = await model.invoke([
            ["system", filledPrompt],
            ["human", message]
        ]);
        
        console.log("\nSystem Prompt:");
        console.log(filledPrompt);
        console.log("\nUser Message:");
        console.log(message);
        console.log("\nAI Response:");
        console.log(response.content);
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testPrompt(); 