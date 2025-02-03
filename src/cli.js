import "dotenv/config";
import readline from "readline";
import { runAgent } from "./agent.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to the Intake Specialist! Type 'exit' to quit.");
console.log("How can I help you today?");

const chatHistory = [];

async function processUserInput(input) {
    if (input.toLowerCase() === 'exit') {
        console.log("Goodbye!");
        rl.close();
        return;
    }

    try {
        const response = await runAgent(input, chatHistory);
        console.log("\nAssistant:", response);
        chatHistory.push(new HumanMessage(input));
        chatHistory.push(new AIMessage(response));
    } catch (error) {
        console.error("Error:", error);
        console.log("An error occurred. Please try again.");
    }

    rl.question("\nYou: ", processUserInput);
}

rl.question("You: ", processUserInput); 