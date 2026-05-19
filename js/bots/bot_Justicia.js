window.botJusticia = {
  name: "Justicia",
  avatar: "⚖️",
  difficulty: "hard",
  getMove(board, currentPlayer) {
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    return window.getBestMove(board, currentPlayer, opponent, 5);
  },
  getQuote(type) {
    const quotes = {
      before: [
        "Justice will be served on this grid.",
        "I weigh every possibility.",
        "Balance must be maintained.",
        "No move escapes my judgment."
      ],
      win: [
        "The verdict is in: victory.",
        "Justice prevails!",
        "Righteous triumph.",
        "Order has been restored."
      ],
      lose: [
        "The scales have tipped against me.",
        "A fair defeat. Well fought.",
        "I accept the outcome with honor.",
        "The court rules in your favor."
      ],
      draw: [
        "A hung jury.",
        "Equilibrium achieved.",
        "Neither side prevailed.",
        "Justice remains neutral."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};