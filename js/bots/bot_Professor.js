window.botProfessor = {
  name: "Professor XO",
  avatar: "🎓",
  difficulty: "expert",
  getMove(board, currentPlayer) {
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    return window.getBestMove(board, currentPlayer, opponent, Infinity);
  },
  getQuote(type) {
    const quotes = {
      before: [
        "According to game theory...",
        "I've published papers on this.",
        "Let me demonstrate optimal play.",
        "The minimax theorem is clear."
      ],
      win: [
        "As predicted in my thesis.",
        "The result was mathematically inevitable.",
        "Education trumps all.",
        "Theory becomes practice."
      ],
      lose: [
        "A fascinating anomaly!",
        "You have disproved my model?",
        "I must revisit my research.",
        "Remarkable. You exceeded expectations."
      ],
      draw: [
        "A textbook draw.",
        "The equilibrium state.",
        "Perfect play yields a tie.",
        "Neither side could improve."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};