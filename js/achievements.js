// xOarena/js/achievements.js
(function() {
  // --- Achievement Definitions ---
  const ACHIEVEMENTS = [];
  // Generate 120 achievements programmatically
  for (let i = 1; i <= 120; i++) {
    let id, name, emoji, desc, condition;
    if (i <= 30) {
      id = `gen_win_${i}`;
      name = `${i} Wins`;
      emoji = '🏆';
      desc = `Win ${i} games`;
      condition = (s) => (s.wins || 0) >= i;
    } else if (i <= 60) {
      id = `gen_games_${i}`;
      name = `${i} Games`;
      emoji = '🎮';
      desc = `Play ${i} games`;
      condition = (s) => (s.gamesPlayed || 0) >= i;
    } else if (i <= 80) {
      id = `gen_draw_${i}`;
      name = `${i} Draws`;
      emoji = '🤝';
      desc = `Achieve ${i} draws`;
      condition = (s) => (s.draws || 0) >= i;
    } else if (i <= 100) {
      id = `gen_click_${i}`;
      name = `${i} Clicks`;
      emoji = '🖱️';
      desc = `Click cells ${i} times`;
      condition = (s) => (s.clicks || 0) >= i;
    } else {
      id = `gen_misc_${i - 100}`;
      name = `Misc ${i - 100}`;
      emoji = '✨';
      desc = `Secret achievement`;
      condition = () => false;
    }
    ACHIEVEMENTS.push({ id, name, emoji, desc, condition });
  }

  // Special named achievements (overwrite some)
  const specials = [
    { id: 'first_win', name: 'First Blood', emoji: '⚔️', desc: 'Win your first game', condition: s => (s.wins || 0) >= 1 },
    { id: 'win_3', name: 'Hat Trick', emoji: '🎩', desc: 'Win 3 games', condition: s => (s.wins || 0) >= 3 },
    { id: 'win_5', name: 'Pentakill', emoji: '⭐', desc: 'Win 5 games', condition: s => (s.wins || 0) >= 5 },
    { id: 'win_10', name: 'Decimator', emoji: '💥', desc: 'Win 10 games', condition: s => (s.wins || 0) >= 10 },
    { id: 'streak_3', name: '3-Win Streak', emoji: '🔥', desc: 'Win 3 games in a row', condition: s => (s.currentStreak || 0) >= 3 },
    { id: 'streak_5', name: '5-Win Streak', emoji: '💪', desc: 'Win 5 games in a row', condition: s => (s.currentStreak || 0) >= 5 },
    { id: 'beat_mentor', name: 'Master Slayer', emoji: '🧠', desc: 'Defeat Master Mentor', condition: s => (s.botsBeaten || []).includes('mentor') },
    { id: 'beat_professor', name: 'Thesis Rejected', emoji: '🎓', desc: 'Defeat Professor XO', condition: s => (s.botsBeaten || []).includes('professor') },
    { id: 'beat_executive', name: 'Corporate Takeover', emoji: '💼', desc: 'Defeat The Executive', condition: s => (s.botsBeaten || []).includes('executive') },
    { id: 'beat_justicia', name: 'Justice Served', emoji: '⚖️', desc: 'Defeat Justicia', condition: s => (s.botsBeaten || []).includes('justicia') },
    { id: 'beat_strategist', name: 'Fox Hunter', emoji: '🦊', desc: 'Defeat The Strategist', condition: s => (s.botsBeaten || []).includes('strategist') },
    { id: 'beat_astro', name: 'Star Sailor', emoji: '🚀', desc: 'Defeat Astro Navigator', condition: s => (s.botsBeaten || []).includes('astro') },
    { id: 'beat_rookie', name: 'Rookie Tamer', emoji: '🔰', desc: 'Defeat Rookie Rumbler', condition: s => (s.botsBeaten || []).includes('rookie') },
  ];
  // Merge specials (replace existing IDs or add new)
  specials.forEach(special => {
    const idx = ACHIEVEMENTS.findIndex(a => a.id === special.id);
    if (idx !== -1) ACHIEVEMENTS[idx] = special;
  });

  // --- Stats Management ---
  const STATS_KEY = 'xOarena_achievementStats';
  let stats = { wins:0, gamesPlayed:0, draws:0, currentStreak:0, botsBeaten:[], clicks:0 };

  function loadStats() {
    const saved = JSON.parse(localStorage.getItem(STATS_KEY));
    if (saved) Object.assign(stats, saved);
  }
  function saveStats() {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }

  // Global increment function
  window.incrementStat = function(key, value = 1) {
    loadStats(); // ensure fresh
    stats[key] = (stats[key] || 0) + value;
    if (key === 'win') stats.wins = (stats.wins || 0) + value;
    if (key === 'gamesPlayed') stats.gamesPlayed = (stats.gamesPlayed || 0) + value;
    if (key === 'draws') stats.draws = (stats.draws || 0) + value;
    if (key === 'clicks') stats.clicks = (stats.clicks || 0) + value;
    saveStats();
    window.checkAchievements();
  };

  // Update streak after a game result
  window.updateStreak = function(won) {
    loadStats();
    if (won) {
      stats.currentStreak = (stats.currentStreak || 0) + 1;
    } else {
      stats.currentStreak = 0;
    }
    saveStats();
    window.checkAchievements();
  };

  // Add bot beaten
  window.addBotBeaten = function(botKey) {
    loadStats();
    if (!stats.botsBeaten) stats.botsBeaten = [];
    if (!stats.botsBeaten.includes(botKey)) {
      stats.botsBeaten.push(botKey);
      saveStats();
      window.checkAchievements();
    }
  };

  // Achievements check
  window.checkAchievements = function() {
    loadStats();
    const unlocked = JSON.parse(localStorage.getItem('xOarena_unlocked') || '[]');
    for (const ach of ACHIEVEMENTS) {
      if (!unlocked.includes(ach.id) && ach.condition(stats)) {
        unlockAchievement(ach);
      }
    }
  };

  function unlockAchievement(ach) {
    const unlocked = JSON.parse(localStorage.getItem('xOarena_unlocked') || '[]');
    if (!unlocked.includes(ach.id)) {
      unlocked.push(ach.id);
      localStorage.setItem('xOarena_unlocked', JSON.stringify(unlocked));
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = `🏅 Achievement Unlocked: ${ach.emoji} ${ach.name}`;
      document.getElementById('toastContainer')?.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      if (window.playSound) window.playSound('achievement');
    }
  }

  // --- Render achievements grid with tooltip ---
  window.renderAchievements = function(containerId = 'achievementsGrid') {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';
    const unlocked = JSON.parse(localStorage.getItem('xOarena_unlocked') || '[]');
    ACHIEVEMENTS.forEach(ach => {
      const badge = document.createElement('div');
      badge.className = 'achievement-badge' + (unlocked.includes(ach.id) ? '' : ' locked');
      badge.innerHTML = `<span class="achievement-emoji">${unlocked.includes(ach.id) ? ach.emoji : '❓'}</span>
                         <span class="achievement-name">${unlocked.includes(ach.id) ? ach.name : '???'}</span>`;
      // Tooltip on hover
      badge.title = ach.desc;
      badge.addEventListener('mouseenter', (e) => {
        showTooltip(e, ach.desc, badge);
      });
      badge.addEventListener('mouseleave', hideTooltip);
      grid.appendChild(badge);
    });
    const countEl = document.getElementById('achievementsCount');
    if (countEl) countEl.textContent = `Unlocked: ${unlocked.length} / ${ACHIEVEMENTS.length}`;
  };

  // Simple tooltip
  let tooltipEl = null;
  function showTooltip(e, text, parent) {
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'achievement-tooltip';
      document.body.appendChild(tooltipEl);
    }
    tooltipEl.textContent = text;
    const rect = parent.getBoundingClientRect();
    tooltipEl.style.left = rect.left + rect.width / 2 + 'px';
    tooltipEl.style.top = rect.top - 40 + 'px';
    tooltipEl.style.display = 'block';
  }
  function hideTooltip() {
    if (tooltipEl) tooltipEl.style.display = 'none';
  }

  // Expose for settingsUI
  window.getAchievementStats = function() {
    loadStats();
    return stats;
  };

  window.initAchievements = function() {
    loadStats();
    // Initial render on settings page
    if (document.getElementById('achievementsGrid')) {
      window.renderAchievements();
    }
  };
})();