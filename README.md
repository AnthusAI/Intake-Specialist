# Intake Specialist

A simple demo of using a ReAct loop to manage a checklist of required items for an intake form. The agent maintains state while having natural conversations with users to gather required information.

## Current Status
- Basic CLI interface implemented
- State management tools created and tested:
  - `read_state`: Tool that ReAct agent uses to check what information it has
  - `update_state`: Tool that ReAct agent uses to save new information from conversations
  - `validate_completeness`: Tool that ReAct agent uses to decide what to ask for next
- OpenAI integration verified and working
- System prompt template created and tested
- ReAct agent implemented and working:
  - Uses tools to maintain conversation state
  - Extracts and saves information from natural conversation
  - Validates completeness of gathered information

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

## Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env to add your OpenAI API key

# Run the test conversation
npm test
```

## Testing Interface
```bash
# Run a test conversation with predefined messages
npm test

# Test just the OpenAI connection
node src/test-llm.js

# Test the prompt template
node src/test-prompt.js
```

## Project Structure
```
src/
  ├── agent.js      # ReAct agent implementation
  ├── tools.js      # State management tools
  ├── prompts.js    # System and human prompts
  ├── test-agent.js # Test conversation flow
  └── test-llm.js   # Test OpenAI connection
```

## Development Approach
Taking small, verifiable steps. Each change should be testable before moving to the next step.

See `.cursorrules` for full project details and development plan. 