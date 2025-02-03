import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, ChatAgentOutputParser } from "langchain/agents";
import { formatLogToString } from "langchain/agents/format_scratchpad/log";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

// Import our tools and prompts
import { readState, updateState, validateCompleteness } from './tools.js';
import { SYSTEM_PROMPT, HUMAN_PROMPT } from './prompts.js';

// Initialize the model
const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
});

// Create the list of tools
const tools = [readState, updateState, validateCompleteness];

// Create the output parser
const outputParser = new ChatAgentOutputParser();

// Create the agent
const createAgent = () => {
    // Format tools for the prompt
    const toolDescriptions = tools
        .map(tool => `${tool.name}: ${tool.description}`)
        .join("\n");

    // Create the prompt template
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", SYSTEM_PROMPT.replace("{tools}", toolDescriptions)],
        new MessagesPlaceholder("chat_history"),
        ["human", HUMAN_PROMPT],
        new MessagesPlaceholder("agent_scratchpad"),
    ]);

    // Create the agent's runnable sequence
    const runnableAgent = RunnableSequence.from([
        {
            input: (i) => i.input,
            chat_history: (i) => i.chat_history.map(([human, ai]) => [
                new HumanMessage(human),
                new AIMessage(ai),
            ]).flat(),
            agent_scratchpad: (i) => i.steps.map(step => 
                new AIMessage(formatLogToString(step))
            ),
        },
        prompt,
        model,
        outputParser,
    ]);

    // Create the agent executor
    return AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
    });
};

export { createAgent }; 