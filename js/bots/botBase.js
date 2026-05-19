// xOarena/js/bots/botBase.js
// Shared utility functions – available as global variables

window.checkWin = function(board, player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(combo => combo.every(index => board[index] === player));
};

window.getEmptyCells = function(board) {
  return board.reduce((acc, cell, idx) => {
    if (cell === '') acc.push(idx);
    return acc;
  }, []);
};

window.minimax = function(board, botSymbol, playerSymbol, depth, isMaximizing, maxDepth = Infinity) {
  if (depth >= maxDepth) return 0;
  if (window.checkWin(board, botSymbol)) return 10 - depth;
  if (window.checkWin(board, playerSymbol)) return depth - 10;
  if (window.getEmptyCells(board).length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const index of window.getEmptyCells(board)) {
      board[index] = botSymbol;
      const score = window.minimax(board, botSymbol, playerSymbol, depth + 1, false, maxDepth);
      board[index] = '';
      best = Math.max(best, score);
    }
    return best;
  } else {
    let best = Infinity;
    for (const index of window.getEmptyCells(board)) {
      board[index] = playerSymbol;
      const score = window.minimax(board, botSymbol, playerSymbol, depth + 1, true, maxDepth);
      board[index] = '';
      best = Math.min(best, score);
    }
    return best;
  }
};

window.getBestMove = function(board, botSymbol, playerSymbol, maxDepth = Infinity) {
  let bestScore = -Infinity;
  let bestMove = null;
  const emptyCells = window.getEmptyCells(board);
  for (const index of emptyCells) {
    board[index] = botSymbol;
    const score = window.minimax(board, botSymbol, playerSymbol, 0, false, maxDepth);
    board[index] = '';
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  return bestMove !== null ? bestMove : emptyCells[0];
};