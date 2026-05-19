// xOarena/js/twoPlayer.js
(function() {
  let game, boardElement, turnSymbol, gameStatus, scoreX, scoreO, scoreDraws;
  let scores = { X: 0, O: 0, draws: 0 };

  function updateUI() {
    const board = game.getBoard();
    const cells = boardElement.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
      cell.classList.toggle('x-symbol', board[i] === 'X');
      cell.classList.toggle('o-symbol', board[i] === 'O');
    });

    if (!game.isGameOver()) {
      turnSymbol.textContent = game.getCurrentPlayer();
      turnSymbol.classList.toggle('turn-x', game.getCurrentPlayer() === 'X');
      turnSymbol.classList.toggle('turn-o', game.getCurrentPlayer() === 'O');
      turnSymbol.classList.add('active');
      gameStatus.textContent = '';
    } else {
      turnSymbol.classList.remove('active');
      if (game.getWinner()) {
        gameStatus.textContent = `🎉 Player ${game.getWinner()} wins!`;
        triggerCelebration();
        if (window.playSound) window.playSound('winner');
        updateScores(game.getWinner());
      } else {
        gameStatus.textContent = '🤝 Draw!';
        updateScores(null);
      }
      highlightWinCombo();
    }
  }

  function updateScores(winner) {
    if (winner === 'X') { scores.X++; scoreX.textContent = scores.X; }
    else if (winner === 'O') { scores.O++; scoreO.textContent = scores.O; }
    else { scores.draws++; scoreDraws.textContent = scores.draws; }
    // Save stats for achievements
    localStorage.setItem('xOarena_stats', JSON.stringify(scores));
  }

  function highlightWinCombo() {
    const combo = game.getWinCombo();
    if (combo && combo.length) {
      combo.forEach(i => boardElement.querySelector(`.cell[data-index="${i}"]`)?.classList.add('win-highlight'));
    }
  }

  function triggerCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    const emojis = ['🎉','🎉','🎉','👏','🏆','✨','🥳','🎊'];
    for (let i = 0; i < 12; i++) {
      const span = document.createElement('span');
      span.className = 'celebration-emoji';
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.animationDelay = Math.random() * 0.4 + 's';
      overlay.appendChild(span);
    }
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.display = 'none'; }, 2500);
  }

  function cellClickHandler(e) {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;
    const index = parseInt(cell.dataset.index);
    if (game.isGameOver() || game.getBoard()[index] !== '') return;
    game.makeMove(index);
    updateUI();
    if (window.checkAchievements) window.checkAchievements();
  }

  window.resetGame = function() {
    game.reset();
    updateUI();
    boardElement.querySelectorAll('.cell').forEach(cell => cell.classList.remove('win-highlight'));
  };

  window.newGame = function() {
    scores = { X: 0, O: 0, draws: 0 };
    scoreX.textContent = '0';
    scoreO.textContent = '0';
    scoreDraws.textContent = '0';
    localStorage.setItem('xOarena_stats', JSON.stringify(scores));
    window.resetGame();
  };

  window.initTwoPlayer = function() {
    game = new window.GameLogic();
    boardElement = document.getElementById('gameBoard');
    turnSymbol = document.getElementById('turnSymbol');
    gameStatus = document.getElementById('gameStatus');
    scoreX = document.getElementById('scoreX');
    scoreO = document.getElementById('scoreO');
    scoreDraws = document.getElementById('scoreDraws');

    // Load saved scores
    const saved = JSON.parse(localStorage.getItem('xOarena_stats'));
    if (saved) {
      scores = saved;
      scoreX.textContent = scores.X;
      scoreO.textContent = scores.O;
      scoreDraws.textContent = scores.draws;
    }

    boardElement.addEventListener('click', cellClickHandler);
    document.getElementById('resetBtn').addEventListener('click', window.resetGame);
    document.getElementById('newGameBtn').addEventListener('click', window.newGame);

    // Initial UI
    updateUI();
  };
})();