window.botRookie = {
  name: "Rookie Rumbler",
  avatar: "🔰",
  difficulty: "easy",
  getMove(board, currentPlayer) {
    const empty = window.getEmptyCells(board);
    if (empty.length === 0) return null;
    const rand = Math.floor(Math.random() * empty.length);
    return empty[rand];
  },
  getQuote(type) {
    const quotes = {
      before: [
        "Uh... where should I go?",
        "I just learned the rules yesterday!",
        "Let's see how this goes...",
        "Don't expect much from me!"
      ],
      win: [
        "Wait, I won?! Beginner's luck!",
        "Wow, that actually worked?",
        "I can't believe it!",
        "Did you let me win?"
      ],
      lose: [
        "Aww, I'll practice more!",
        "You're too good for me.",
        "Next time I'll try harder!",
        "That was a learning experience."
      ],
      draw: [
        "A tie? I'll take it!",
        "Not bad for a rookie.",
        "We both survived!",
        "Phew, no loss at least."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};