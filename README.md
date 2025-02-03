# AI Intake Specialist

An AI-powered intake specialist for financial applications that uses ReAct patterns to manage natural conversations while gathering required information.

## Features

- Natural conversation flow while gathering required information
- Robust state management with field validation
- Clean status display showing progress
- Error handling and recovery
- OpenAI GPT-4 integration

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Running the Application

Start the interactive chat:
```bash
npm start
```

The application will guide you through the intake process using natural conversation. Type 'exit' to quit at any time.

## Required Information

The agent gathers the following information:
- Company Name
- Operating Country
- Debt Issuance Country

Each field is tracked and validated as the conversation progresses. The current status is displayed after each update.

## Example Conversation

```
You: We need financing.

Current Status:
Required Information:
□ company name: Not provided
□ operating country: Not provided
□ debt issuance country: Not provided

## Project Structure

- `src/`
  - `agent.js` - Core ReAct agent implementation
  - `cli.js` - Interactive CLI interface
  - `tools.js` - Tool definitions for state management
  - `prompts.js` - System prompts and templates

## Current Status

✓ Completed:
- Basic CLI interface implementation
- State management tools:
  - `read_state`: Tool for checking information
  - `update_state`: Tool for saving new information
  - `validate_completeness`: Tool for determining what to ask next
- OpenAI integration verified and working
- System prompt template with:
  - Agent behavior definition
  - Tool descriptions
  - Conversation flow guidance
- Natural conversation capabilities
- Basic information extraction

🚧 In Progress:
- Enhanced conversation capabilities
- Improved error handling
- Field validation rules
- State persistence

## Development

To contribute or modify:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Development Approach
Taking small, verifiable steps. Each change should be testable before moving to the next step.

See `.cursorrules` for full project details and development plan. 