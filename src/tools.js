import { DynamicTool } from "@langchain/core/tools";

// Shared state object
const state = {
    companyName: null,
    operatingCountry: null,
    debtIssuanceCountry: null,
};

// Tool for reading current state
const readState = new DynamicTool({
    name: "read_state",
    description: "Read the current state of gathered information",
    func: async () => JSON.stringify(state),
});

// Tool for updating state
const updateState = new DynamicTool({
    name: "update_state",
    description: "Update the state with new information. Input should be in format: [field=value]",
    func: async (input) => {
        // Extract field and value from input
        const match = input.match(/\[(.*?)=(.*?)\]/);
        if (!match) {
            throw new Error('Input must be in format: [field=value]');
        }
        
        const [_, field, value] = match;
        
        // Validate field name
        if (!(field in state)) {
            throw new Error(`Unknown field: ${field}. Valid fields are: ${Object.keys(state).join(", ")}`);
        }
        
        // Clean up the value and update state
        const cleanValue = value.trim();
        state[field] = cleanValue;
        
        // Return a more natural response
        const fieldDisplay = field.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
        return `I've updated the ${fieldDisplay} to ${cleanValue}.`;
    },
});

// Tool for validating completeness
const validateCompleteness = new DynamicTool({
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
});

export const tools = [readState, updateState, validateCompleteness]; 