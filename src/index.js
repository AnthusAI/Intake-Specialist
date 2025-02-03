import { ChatOpenAI } from "@langchain/openai";
import inquirer from "inquirer";

// Initialize the chat model
const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
});

// Initial state for tracking gathered information
const state = {
    companyName: null,
    operatingCountry: null,
    debtIssuanceCountry: null,
    // Add more fields as needed
};

// Tool for reading current state
const readState = {
    name: "read_state",
    description: "Read the current state of gathered information",
    func: async () => JSON.stringify(state),
};

// Tool for updating state
const updateState = {
    name: "update_state",
    description: "Update the state with new information",
    func: async (field, value) => {
        state[field] = value;
        return `Updated ${field} to ${value}`;
    },
};

// Tool for validating completeness
const validateCompleteness = {
    name: "validate_completeness",
    description: "Check if all required information is gathered",
    func: async () => {
        const missing = Object.entries(state)
            .filter(([_, value]) => value === null)
            .map(([key]) => key);
        return missing.length === 0 
            ? "All required information gathered" 
            : `Missing information: ${missing.join(", ")}`;
    },
};

// Main chat loop
async function main() {
    console.log("Welcome to the Intake Specialist Demo!");
    console.log("You can have a natural conversation while I gather the required information.");
    console.log("Type 'exit' to quit.\n");

    while (true) {
        const { input } = await inquirer.prompt([{
            type: "input",
            name: "input",
            message: "You:",
        }]);

        if (input.toLowerCase() === "exit") {
            break;
        }

        // TODO: Implement ReAct loop here
        console.log("AI: This is a placeholder response. ReAct loop implementation coming soon!");
    }
}

main().catch(console.error); 