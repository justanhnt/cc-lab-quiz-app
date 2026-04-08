const questions = [
  // Claude Code
  {
    question: "What command initializes a CLAUDE.md file in your project?",
    options: ["/init", "/setup", "/create", "/start"],
    correct: 0,
    category: "Claude Code"
  },
  {
    question: "What is the purpose of CLAUDE.md?",
    options: [
      "Give Claude context about your project",
      "Store API keys securely",
      "Track git history",
      "Define database schemas"
    ],
    correct: 0,
    category: "Claude Code"
  },
  {
    question: "Which tool does Claude Code use for file content search?",
    options: ["Grep", "find", "locate", "awk"],
    correct: 0,
    category: "Claude Code"
  },
  {
    question: "What should you include in CLAUDE.md's NEVER list?",
    options: [
      "Patterns Claude should avoid",
      "Your favorite colors",
      "Git commit hashes",
      "Server passwords"
    ],
    correct: 0,
    category: "Claude Code"
  },
  {
    question: "How do you run a shell command directly in Claude Code's prompt?",
    options: [
      "Prefix with !",
      "Prefix with $",
      "Prefix with #",
      "Prefix with @"
    ],
    correct: 0,
    category: "Claude Code"
  },
  // AI Concepts
  {
    question: "What does 'LLM' stand for?",
    options: [
      "Large Language Model",
      "Linear Learning Machine",
      "Logical Language Method",
      "Low Latency Module"
    ],
    correct: 0,
    category: "AI Concepts"
  },
  {
    question: "What is a 'token' in the context of LLMs?",
    options: [
      "A piece of text (word or subword)",
      "An authentication credential",
      "A type of neural network layer",
      "A GPU memory unit"
    ],
    correct: 0,
    category: "AI Concepts"
  },
  {
    question: "What is the 'context window' of an LLM?",
    options: [
      "Max amount of text it can process at once",
      "The browser window it runs in",
      "The training dataset size",
      "The number of GPUs used"
    ],
    correct: 0,
    category: "AI Concepts"
  },
  {
    question: "What does 'temperature' control in LLM generation?",
    options: [
      "Randomness of output",
      "Speed of inference",
      "Model accuracy",
      "Memory usage"
    ],
    correct: 0,
    category: "AI Concepts"
  },
  {
    question: "What is 'hallucination' in AI?",
    options: [
      "Generating confident but incorrect information",
      "Running out of memory",
      "A type of adversarial attack",
      "Processing images incorrectly"
    ],
    correct: 0,
    category: "AI Concepts"
  },
  // Prompt Engineering
  {
    question: "What is 'few-shot prompting'?",
    options: [
      "Providing examples in the prompt",
      "Using a small model",
      "Limiting output length",
      "Reducing API calls"
    ],
    correct: 0,
    category: "Prompt Engineering"
  },
  {
    question: "Which technique asks the model to 'think step by step'?",
    options: [
      "Chain-of-thought prompting",
      "Zero-shot prompting",
      "Temperature tuning",
      "Embedding search"
    ],
    correct: 0,
    category: "Prompt Engineering"
  },
  {
    question: "What is a 'system prompt'?",
    options: [
      "Instructions that set the model's behavior",
      "The first user message",
      "An error message from the API",
      "A prompt used to train the model"
    ],
    correct: 0,
    category: "Prompt Engineering"
  },
  {
    question: "Why is being specific better than being vague in prompts?",
    options: [
      "Reduces ambiguity and improves output quality",
      "Makes the API call cheaper",
      "Prevents the model from hallucinating entirely",
      "Increases the context window size"
    ],
    correct: 0,
    category: "Prompt Engineering"
  },
  {
    question: "What is 'prompt injection'?",
    options: [
      "Tricking a model into ignoring its instructions",
      "Adding more tokens to a prompt",
      "Compressing prompts for efficiency",
      "A method to fine-tune models"
    ],
    correct: 0,
    category: "Prompt Engineering"
  }
];

export function getQuestions(category = "All") {
  if (category === "All") return [...questions];
  return questions.filter(q => q.category === category);
}

export function getCategories() {
  return ["All", ...new Set(questions.map(q => q.category))];
}
