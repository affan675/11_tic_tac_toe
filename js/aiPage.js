// xOarena/js/aiPage.js
(function() {
  let game, boardElement, gameStatus, botAvatar, botNameDisplay, speechBubble, speechText;
  let currentBot = null;
  let currentBotKey = null;   // for tracking which bot was beaten
  let isBotTurn = false;
  let gameActive = true;

  const botNames = {
    rookie: window.botRookie,
    astro: window.botAstro,
    strategist: window.botStrategist,
    justicia: window.botJusticia,
    executive: window.botExecutive,
    professor: window.botProfessor,
    mentor: window.botMentor
  };

  function selectBot(botKey) {
    currentBot = botNames[botKey];
    currentBotKey = botKey;
    if (!currentBot) return;
    botAvatar.textContent = currentBot.avatar;
    botNameDisplay.textContent = currentBot.name;
    document.querySelectorAll('.bot-list-item').forEach(li => {
      li.classList.toggle('selected', li.dataset.bot === botKey);
    });
    resetGame();
  }

  function updateUI() {
    const board = game.getBoard();
    const cells = boardElement.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
      cell.classList.toggle('x-symbol', board[i] === 'X');
      cell.classList.toggle('o-symbol', board[i] === 'O');
      cell.classList.remove('win-highlight');
    });

    if (!game.isGameOver()) {
      if (game.getCurrentPlayer() === 'X') {
        gameStatus.textContent = 'Your turn';
      } else {
        gameStatus.textContent = `${currentBot.name} is thinking...`;
      }
    } else {
      handleGameEnd();
    }
  }

  function handleGameEnd() {
    const winner = game.getWinner();

    // --- Update stats and achievements ---
    if (typeof window.incrementStat === 'function') {
      window.incrementStat('gamesPlayed', 1);

      if (winner === 'X') {
        // Player won
        window.incrementStat('wins', 1);
        window.updateStreak(true);
        if (currentBotKey && typeof window.addBotBeaten === 'function') {
          window.addBotBeaten(currentBotKey);
        }
      } else if (winner === 'O') {
        // Bot won
        window.updateStreak(false);
      } else {
        // Draw
        window.incrementStat('draws', 1);
        window.updateStreak(false);
      }

      // Trigger achievement check after stats update
      if (typeof window.checkAchievements === 'function') {
        window.checkAchievements();
      }
    }

    // Update UI
    if (winner === 'X') {
      gameStatus.textContent = '🎉 You win!';
      showBotDialogue('lose');
    } else if (winner === 'O') {
      gameStatus.textContent = '😞 Bot wins...';
      showBotDialogue('win');
    } else {
      gameStatus.textContent = '🤝 Draw';
      showBotDialogue('draw');
    }

    triggerCelebration();
    if (window.playSound) window.playSound('winner');
    gameActive = false;
    highlightWinCombo();
  }

  function highlightWinCombo() {
    const combo = game.getWinCombo();
    if (combo && combo.length) {
      combo.forEach(i => boardElement.querySelector(`.cell[data-index="${i}"]`)?.classList.add('win-highlight'));
    }
  }

  function showBotDialogue(type) {
    if (!currentBot || !speechBubble || !speechText) return;
    const quote = currentBot.getQuote(type);
    speechText.textContent = quote;
    speechBubble.style.display = 'block';
  }

  function hideBotDialogue() {
    if (speechBubble) speechBubble.style.display = 'none';
  }

  async function botMove() {
    if (!gameActive || game.isGameOver() || game.getCurrentPlayer() !== 'O') return;
    isBotTurn = true;

    showBotDialogue('before');

    await delay(800);

    const boardState = game.getBoard();
    const moveIndex = currentBot.getMove(boardState, 'O');
    if (moveIndex !== null && moveIndex !== undefined) {
      game.makeMove(moveIndex);
      updateUI();
    }
    isBotTurn = false;
  }

  function cellClickHandler(e) {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;
    if (!gameActive || game.isGameOver() || isBotTurn) return;
    const index = parseInt(cell.dataset.index);
    if (game.getBoard()[index] !== '') return;
    if (game.getCurrentPlayer() !== 'X') return;

    // Track click
    if (typeof window.incrementStat === 'function') {
      window.incrementStat('clicks', 1);
    }

    hideBotDialogue();

    game.makeMove(index);
    updateUI();

    if (!game.isGameOver()) {
      setTimeout(botMove, 500);
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
      overlay.appendChild(span);
    }
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.display = 'none'; }, 2500);
  }

  function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  window.resetGame = function() {
    game.reset();
    gameActive = true;
    isBotTurn = false;
    gameStatus.textContent = 'Your turn';
    hideBotDialogue();
    updateUI();
  };

  window.newGame = function() {
    window.resetGame();
  };

  window.initAIPage = function() {
    game = new window.GameLogic();
    boardElement = document.getElementById('gameBoard');
    gameStatus = document.getElementById('gameStatus');
    botAvatar = document.getElementById('botAvatar');
    botNameDisplay = document.getElementById('botNameDisplay');
    speechBubble = document.getElementById('speechBubble');
    speechText = document.getElementById('speechText');

    selectBot('mentor');

    document.querySelectorAll('.bot-list-item').forEach(li => {
      li.addEventListener('click', () => selectBot(li.dataset.bot));
    });

    boardElement.addEventListener('click', cellClickHandler);
    document.getElementById('resetBtn').addEventListener('click', window.resetGame);
    document.getElementById('newGameBtn').addEventListener('click', window.newGame);

    updateUI();
  };
})();