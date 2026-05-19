window.botExecutive = {
  name: "The Executive",
  avatar: "💼",
  difficulty: "hard",
  getMove(board, currentPlayer) {
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    return window.getBestMove(board, currentPlayer, opponent, 5);
  },
  getQuote(type) {
    const quotes = {
      before: [
        "Let's conduct a board meeting.",
        "I’ve analyzed the quarterly projections.",
        "Efficiency is key.",
        "Time to execute the plan."
      ],
      win: [
        "Deal closed. Victory secured.",
        "The merger is complete.",
        "Profits are up!",
        "My strategy delivered results."
      ],
      lose: [
        "Hostile takeover... I'm out.",
        "The board has overruled me.",
        "A rare market downturn.",
        "I'll restructure my approach."
      ],
      draw: [
        "Stalemate — negotiations continue.",
        "We've reached a compromise.",
        "No one gained the upper hand.",
        "Let's reconvene later."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};