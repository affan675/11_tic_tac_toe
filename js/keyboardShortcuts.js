// xOarena/js/keyboardShortcuts.js
(function() {
  let shortcutsEnabled = true;

  function updateShortcutsEnabled() {
    const stored = localStorage.getItem('xOarena_keyboard');
    shortcutsEnabled = stored !== 'false';
  }

  window.initKeyboardShortcuts = function() {
    updateShortcutsEnabled();

    document.addEventListener('keydown', (e) => {
      if (!shortcutsEnabled) return;
      // Ignore if inside input/textarea
      if (e.target.matches('input, textarea')) return;

      const key = e.key.toLowerCase();
      if (key === 'r') {
        e.preventDefault();
        if (window.resetGame) window.resetGame();
      }
      if (key === 'n') {
        e.preventDefault();
        if (window.newGame) window.newGame();
      }
      if (key === 't') {
        e.preventDefault();
        if (window.cycleTheme) window.cycleTheme();
      }
      if (key === 's') {
        e.preventDefault();
        if (window.location.pathname.includes('settings.html')) return;
        window.location.href = 'settings.html';
      }
    });

    window.addEventListener('storage', updateShortcutsEnabled);
  };

  window.toggleKeyboardShortcuts = function(state) {
    localStorage.setItem('xOarena_keyboard', state ? 'true' : 'false');
    updateShortcutsEnabled();
  };
})();