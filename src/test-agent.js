import 'dotenv/config';
import { createAgent } from './agent.js';

async function testAgent() {
    console.log("Testing ReAct agent...");
    try {
        const agent = createAgent();
        const chat_history = [];
        
        // Test conversation flow
        const messages = [
            "Hi there! I'm interested in discussing financing options.",
            "My company is TechStart Solutions.",
            "We're based in Canada, but looking to issue debt in the US.",
        ];
        
        for (const message of messages) {
            console.log("\nUser:", message);
            
            const result = await agent.invoke({
                input: message,
                chat_history,
                steps: [],
            });
            
            console.log("\nAgent:", result.output);
            chat_history.push([message, result.output]);
        }
        
    } catch (error) {
        console.error("Error:", error);
    }
}

testAgent(); 