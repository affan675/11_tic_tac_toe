// xOarena/js/settingsUI.js
(function() {
  // Initialize toggles based on localStorage
  function initToggles() {
    const toggleMap = {
      toggleKeyboard: {
        key: 'xOarena_keyboard',
        default: true,
        callback: window.toggleKeyboardShortcuts
      },
      toggleSound: {
        key: 'xOarena_sound',
        default: true,
        callback: window.toggleSound
      },
      toggleRightClick: {
        key: 'xOarena_rightclick',
        default: true,
        callback: window.toggleRightClickMenu
      },
      togglePreloader: {
        key: 'xOarena_preloader',
        default: true
        // No callback needed – preloader is checked on page load
      },
      toggleCursor: {
        key: 'xOarena_cursor',
        default: true,
        callback: window.toggleCustomCursor
      }
    };

    for (const [id, cfg] of Object.entries(toggleMap)) {
      const checkbox = document.getElementById(id);
      if (!checkbox) continue;

      const stored = localStorage.getItem(cfg.key);
      const value = stored === null ? cfg.default : stored === 'true';
      checkbox.checked = value;

      checkbox.addEventListener('change', (e) => {
        const newState = e.target.checked;
        localStorage.setItem(cfg.key, newState ? 'true' : 'false');
        if (cfg.callback) cfg.callback(newState);
      });

      // Apply initial state
      if (cfg.callback) cfg.callback(value);
    }
  }

  // Load and display profile stats
  function initProfileStats() {
    const stats = window.getAchievementStats
      ? window.getAchievementStats()
      : { wins: 0, gamesPlayed: 0, draws: 0 };

    document.getElementById('statGamesPlayed').textContent = stats.gamesPlayed || 0;
    document.getElementById('statWins').textContent = stats.wins || 0;
    document.getElementById('statDraws').textContent = stats.draws || 0;

    const unlocked = JSON.parse(localStorage.getItem('xOarena_unlocked') || '[]');
    document.getElementById('statAchievementsUnlocked').textContent = unlocked.length;
  }

  // Switch tabs
  function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');

        const panelId = 'tab' + target.charAt(0).toUpperCase() + target.slice(1);
        document.getElementById(panelId).classList.add('active');

        if (target === 'profile') {
          initProfileStats();
          if (window.renderAchievements) window.renderAchievements();
        }
      });
    });
  }

  window.initSettingsUI = function() {
    setupTabs();
    initToggles();
    // Initial profile stats (if profile tab is opened later they'll update)
    initProfileStats();
    // Initial achievements render if the grid exists
    if (document.getElementById('achievementsGrid') && window.renderAchievements) {
      window.renderAchievements();
    }
  };
})();