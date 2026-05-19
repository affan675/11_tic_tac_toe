window.botStrategist = {
  name: "The Strategist",
  avatar: "🦊",
  difficulty: "medium",
  getMove(board, currentPlayer) {
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    const empty = window.getEmptyCells(board);
    if (empty.length === 0) return null;
    // Try to win
    for (const idx of empty) {
      board[idx] = currentPlayer;
      if (window.checkWin(board, currentPlayer)) {
        board[idx] = '';
        return idx;
      }
      board[idx] = '';
    }
    // Block opponent
    for (const idx of empty) {
      board[idx] = opponent;
      if (window.checkWin(board, opponent)) {
        board[idx] = '';
        return idx;
      }
      board[idx] = '';
    }
    // Random
    return empty[Math.floor(Math.random() * empty.length)];
  },
  getQuote(type) {
    const quotes = {
      before: [
        "I see your patterns...",
        "Strategy is my middle name.",
        "Every move has a purpose.",
        "You're in my trap now."
      ],
      win: [
        "Outsmarted you!",
        "Checkmate in 3x3.",
        "My strategy prevailed.",
        "Too easy."
      ],
      lose: [
        "You outplayed me.",
        "Impressive foresight!",
        "I'll revise my algorithm.",
        "A strategic defeat... well played."
      ],
      draw: [
        "A perfectly matched battle.",
        "Stalemate – neither could break through.",
        "Draw accepted. Rematch?",
        "Strategic balance maintained."
      ]
    };
    const pool = quotes[type] || quotes.before;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};