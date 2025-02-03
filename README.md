# AI Intake Specialist

An AI-powered intake specialist for financial applications that uses ReAct patterns to manage natural conversations while gathering required information.

## Features

- Natural conversation flow while gathering required information
- State management to track progress
- Tool-based architecture for extensibility
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

### Interactive Mode
Start the interactive chat using:
```bash
npm start
```

The application will guide you through the intake process using natural conversation. Type 'exit' to quit at any time.

### Testing Mode
Run the automated test conversation:
```bash
npm test
```

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

## Example Conversation
```
User: Hi there! I'm interested in discussing financing options.

Agent: Hello! I'm glad you reached out to discuss financing options. I'm here 
to help gather some information for your application. To start, could you 
please tell me the name of your company?

User: My company is TechStart Solutions.

Agent: Great! Thank you for sharing that. Let me update your company name 
in the system.

<tool>update_state[companyName=TechStart Solutions]</tool>

Now, could you please let me know the country where your company operates?

User: We're based in Canada, but looking to issue debt in the US.

Agent: Thank you for that information! I'll update both the operating country 
and the debt issuance country.

<tool>update_state[operatingCountry=Canada]</tool>
<tool>update_state[debtIssuanceCountry=US]</tool>

Let me check if we have all the required information so far.

<tool>validate_completeness</tool>
```

## Required Information
The agent gathers the following information:
- Company Name
- Operating Country
- Debt Issuance Country

## Development Approach
Taking small, verifiable steps. Each change should be testable before moving to the next step.

See `.cursorrules` for full project details and development plan. 