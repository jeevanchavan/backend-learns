export const MOCK_BATTLES = [
  {
    id: "b_101",
    prompt: "Write a React hook to fetch data with automatic retries.",
    winner: "Mistral",
    date: "2023-10-24",
    scores: { Mistral: 9.2, Cohere: 8.5 }
  },
  {
    id: "b_102",
    prompt: "Explain quantum entanglement to a 5-year-old.",
    winner: "Cohere",
    date: "2023-10-25",
    scores: { Mistral: 7.8, Cohere: 9.5 }
  },
  {
    id: "b_103",
    prompt: "Write a Python script to scrape a table from Wikipedia.",
    winner: "Mistral",
    date: "2023-10-26",
    scores: { Mistral: 8.9, Cohere: 8.7 }
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, model: "Mistral Large", wins: 145, losses: 32, avgScore: 8.9 },
  { rank: 2, model: "Cohere Command R+", wins: 138, losses: 39, avgScore: 8.7 },
  { rank: 3, model: "Llama 3 70B", wins: 112, losses: 65, avgScore: 8.4 },
  { rank: 4, model: "Claude 3 Sonnet", wins: 98, losses: 79, avgScore: 8.1 },
  { rank: 5, model: "GPT-4o Mini", wins: 85, losses: 92, avgScore: 7.9 },
];

export const MOCK_CURRENT_BATTLE = {
  problem: "Write a short, engaging welcome email for new users of an AI SaaS platform. It should be friendly but professional.",
  solution_1: `Subject: Welcome to Agent Arena! 🚀\n\nHi there,\n\nWe're thrilled to have you on board! Agent Arena is built to help you discover the best AI models by comparing them side-by-side in real time.\n\nHere’s how you can get started:\n1. **Run a Battle**: Enter a prompt and see models compete.\n2. **Check the Leaderboard**: See who's winning overall.\n3. **Explore History**: Dive into past battles for inspiration.\n\nIf you have any questions, just reply to this email. We're here to help!\n\nBest,\nThe Agent Arena Team`,
  solution_2: `Subject: You're in! Welcome to Agent Arena.\n\nHello!\n\nWelcome to Agent Arena. We are excited to see what you build and compare. Our platform provides unbiased evaluations of the top language models.\n\nTo begin, navigate to your dashboard and type your first prompt.\n\nThank you,\nAgent Arena Support`,
  judge: {
    solution_1_score: 9.0,
    solution_2_score: 6.5,
    solution_1_reasoning: "Excellent tone—perfectly balances friendly and professional. The use of bullet points makes it highly readable and actionable for a new user.",
    solution_2_reasoning: "A bit too dry and robotic for a welcome email. It lacks the engaging hook and clear next steps found in Solution 1.",
  }
};
