window.botMentor = {
  name: "Master Mentor",
  avatar: "🧠",
  difficulty: "expert",
  getMove(board, currentPlayer) {
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    return window.getBestMove(board, currentPlayer, opponent, Infinity);
  },
  getQuote(type) {
    const quotes = {
      before: [
        "Observe and learn, young one.",
        "Every move is a lesson.",
        "Let me show you the path.",
        "Patience is the ultimate strategy."
      ],
      win: [
        "You are not yet ready, grasshopper.",
        "Victory teaches nothing; defeat, everything.",
        "Experience speaks.",
        "The master always has another move."
      ],
      lose: [
        "Ah, you have surpassed the master.",
        "Proud of your growth.",
        "You are the master now.",
        "A student must eventually beat the teacher."
      ],
      draw: [
        "Wisdom recognizes balance.",
        "The journey continues.",
        "Neither of us lost today.",
        "Harmony achieved."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};