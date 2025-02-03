# Intake Specialist

A simple demo of using a ReAct loop to manage a checklist of required items for an intake form.

## Current Status
- Basic CLI interface implemented
- State management tools created and tested:
  - `read_state`: Tool that ReAct agent will use to check what information it has
  - `update_state`: Tool that ReAct agent will use to save new information from conversations
  - `validate_completeness`: Tool that ReAct agent will use to decide what to ask for next
- OpenAI integration verified and working
- System prompt template created and tested:
  - Defines agent behavior and goals
  - Includes tool descriptions
  - Guides natural conversation flow

These tools form the foundation for the ReAct agent. The agent will:
1. Use these same tools to maintain conversation state
2. Decide which tool to use based on the current conversation
3. Generate natural responses while gathering required information

## Current Testing Interface
```bash
# Available commands
read              # Show current state
update <field> <value>  # Update a field
validate          # Check what information is still needed
exit              # Quit the program
```

## Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env to add your OpenAI API key

# Run the CLI
npm start
```

## Development Approach
Taking small, verifiable steps. Each change should be testable before moving to the next step.

See `.cursorrules` for full project details and development plan. 