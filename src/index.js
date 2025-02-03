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
    console.log("Available commands:");
    console.log("- read: Show current state");
    console.log("- update <field> <value>: Update state");
    console.log("- validate: Check completeness");
    console.log("- exit: Quit the program\n");

    while (true) {
        const { input } = await inquirer.prompt([{
            type: "input",
            name: "input",
            message: "Command:",
        }]);

        if (input.toLowerCase() === "exit") {
            break;
        }

        const [command, ...args] = input.split(" ");

        try {
            switch (command.toLowerCase()) {
                case "read":
                    console.log("Current state:", await readState.func());
                    break;
                case "update":
                    if (args.length < 2) {
                        console.log("Usage: update <field> <value>");
                        break;
                    }
                    const [field, ...valueWords] = args;
                    const value = valueWords.join(" ");
                    if (field in state) {
                        console.log(await updateState.func(field, value));
                    } else {
                        console.log("Unknown field:", field);
                        console.log("Available fields:", Object.keys(state).join(", "));
                    }
                    break;
                case "validate":
                    console.log(await validateCompleteness.func());
                    break;
                default:
                    console.log("Unknown command. Available commands: read, update, validate, exit");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}

main().catch(console.error); 