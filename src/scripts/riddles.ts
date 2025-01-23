riddles =
[
  {
    "question": "The more you take, the more you leave behind. What am I?",
    "solution": "Footsteps",
    "explanation": "As you walk, you leave behind footprints, and the more you walk (take steps), the more footprints (trails) you leave behind."
  },
  {
    "question": "I am always in front of you, but you can never see me. What am I?",
    "solution": "The Future",
    "explanation": "The future is always ahead of you (in time), but it's impossible to see or predict precisely, hence it's invisible."
  },
  {
    "question": "What is the one thing you can never lose, no matter what?",
    "solution": "Your shadow",
    "explanation": "Your shadow will always be with you, as long as there's light, no matter where you go."
  }
]

export const getRandomRiddle = () => {
  const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
  return randomRiddle;  
};

