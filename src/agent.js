import { ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";

// Import our tools and prompts
import { tools } from "./tools.js";
import { SYSTEM_PROMPT } from "./prompts.js";

// Initialize the model
const model = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
});

// Helper function to format messages
function formatToOpenAIMessages(steps) {
    return steps.flatMap((step) => {
        if (step.action) {
            return [
                new AIMessage(`Tool Response: ${step.observation}`),
            ];
        }
        return [];
    });
}

// Agent output parser
class AgentOutputParser {
    async parse(text) {
        // First, try to find an action
        const actionMatch = text.match(/Action: (.*?)\nAction Input: (.*?)(?=\n|$)/s);
        if (actionMatch) {
            return {
                type: "tool",
                tool: actionMatch[1].trim(),
                toolInput: actionMatch[2].trim(),
                log: text,
            };
        }

        // If no action is found, look for a final answer
        const finalMatch = text.match(/Final Answer: (.*)/s);
        if (finalMatch) {
            return {
                type: "finish",
                returnValues: { output: finalMatch[1].trim() },
                log: text,
            };
        }

        // If neither format is found, wrap the text as a final answer
        return {
            type: "finish",
            returnValues: { output: text.trim() },
            log: text,
        };
    }

    getFormatInstructions() {
        return `When you want to use a tool, output in this format:
Action: tool name
Action Input: tool input

When you want to respond to the human, output in this format:
Final Answer: your response`;
    }
}

// Create the prompt template with tool descriptions
const toolDescriptions = tools.map(tool => `${tool.name}: ${tool.description}`).join("\n");
const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nAvailable Tools:\n${toolDescriptions}`;

const prompt = ChatPromptTemplate.fromMessages([
    ["system", fullSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
]);

// Create the agent
const agent = RunnableSequence.from([
    {
        input: (i) => i.input,
        chat_history: (i) => i.chat_history,
        agent_scratchpad: (i) => formatToOpenAIMessages(i.steps),
    },
    prompt,
    model,
]);

// Create the executor
const executor = {
    async invoke({ input, chat_history = [] }) {
        let steps = [];
        let finalOutput = null;
        let maxIterations = 5;
        let currentIteration = 0;
        
        while (!finalOutput && currentIteration < maxIterations) {
            currentIteration++;
            console.log(`\nIteration ${currentIteration}`);
            
            try {
                const response = await agent.invoke({
                    input,
                    chat_history,
                    steps,
                });
                
                console.log("Raw model response:", response);
                
                // Parse the response
                const result = await new AgentOutputParser().parse(response.content);
                console.log("Parsed response:", result);
                
                if (result.type === "finish") {
                    finalOutput = result.returnValues.output;
                } else if (result.type === "tool") {
                    const tool = tools.find(t => t.name === result.tool);
                    if (!tool) {
                        console.error(`Tool not found: ${result.tool}`);
                        finalOutput = "I apologize, but I encountered an error. Let me try a different approach.";
                        break;
                    }
                    
                    try {
                        const observation = await tool.func(result.toolInput);
                        console.log(`Tool ${result.tool} response:`, observation);
                        steps.push({
                            action: result,
                            observation,
                        });
                    } catch (error) {
                        console.error("Tool execution error:", error);
                        finalOutput = "I apologize, but I encountered an error. Let me try a different approach.";
                        break;
                    }
                }
            } catch (error) {
                console.error("Agent execution error:", error);
                finalOutput = "I encountered an error. Let me try a different approach.";
                break;
            }
        }
        
        if (!finalOutput) {
            finalOutput = "I apologize, but I need to take a different approach. Could you please rephrase your request?";
        }
        
        return { output: finalOutput };
    }
};

export async function runAgent(input, chatHistory = []) {
    try {
        const result = await executor.invoke({
            input,
            chat_history: chatHistory,
        });
        return result.output;
    } catch (error) {
        console.error("Error running agent:", error);
        return "I encountered an error. Please try again.";
    }
} 