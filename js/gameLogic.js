// xOarena/js/gameLogic.js
(function() {
  class GameLogic {
    constructor() {
      this.board = Array(9).fill('');
      this.currentPlayer = 'X';
      this.winner = null;
      this.isDraw = false;
      this.gameOver = false;
      this.winCombo = [];
    }

    getBoard() { return [...this.board]; }

    reset() {
      this.board = Array(9).fill('');
      this.currentPlayer = 'X';
      this.winner = null;
      this.isDraw = false;
      this.gameOver = false;
      this.winCombo = [];
    }

    makeMove(index) {
      if (this.gameOver || this.board[index] !== '') return false;
      this.board[index] = this.currentPlayer;

      // Check win
      const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      for (const combo of wins) {
        const [a,b,c] = combo;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.winner = this.currentPlayer;
          this.winCombo = combo;
          this.gameOver = true;
          return true;
        }
      }

      // Check draw
      if (!this.board.includes('')) {
        this.isDraw = true;
        this.gameOver = true;
        return true;
      }

      // Switch player
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      return true;
    }

    getCurrentPlayer() { return this.currentPlayer; }
    isGameOver() { return this.gameOver; }
    getWinner() { return this.winner; }
    getWinCombo() { return this.winCombo; }
  }

  window.GameLogic = GameLogic;
})();