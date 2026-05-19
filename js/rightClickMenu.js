// xOarena/js/rightClickMenu.js
(function() {
  let menuEnabled = true;

  function updateMenuEnabled() {
    const stored = localStorage.getItem('xOarena_rightclick');
    menuEnabled = stored !== 'false'; // default true
  }

  window.initRightClickMenu = function() {
    const menu = document.getElementById('rightClickMenu');
    if (!menu) return;

    updateMenuEnabled();

    // Only attach on game pages (body has class or we check path)
    const path = window.location.pathname.split('/').pop();
    if (!['two_players.html', 'ai.html'].includes(path)) return;

    const board = document.getElementById('gameBoard');
    if (!board) return;

    board.addEventListener('contextmenu', (e) => {
      if (!menuEnabled) return;
      e.preventDefault();
      const x = e.clientX, y = e.clientY;
      menu.style.display = 'flex';
      menu.style.left = Math.min(x, window.innerWidth - 180) + 'px';
      menu.style.top = Math.min(y, window.innerHeight - 140) + 'px';
    });

    // Hide menu on click elsewhere
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) {
        menu.style.display = 'none';
      }
    });

    // Menu actions
    menu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'reset' && window.resetGame) window.resetGame();
        if (action === 'new' && window.newGame) window.newGame();
        if (action === 'theme' && window.cycleTheme) window.cycleTheme();
        menu.style.display = 'none';
      });
    });

    window.addEventListener('storage', updateMenuEnabled);
  };

  window.toggleRightClickMenu = function(state) {
    localStorage.setItem('xOarena_rightclick', state ? 'true' : 'false');
    updateMenuEnabled();
  };
})();