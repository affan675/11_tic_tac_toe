// xOarena/js/soundManager.js
(function() {
  let soundEnabled = true;

  const sounds = {
    click: document.getElementById('clickSound'),
    winner: document.getElementById('winnerSound'),
    achievement: document.getElementById('achievementSound')
  };

  function updateSoundEnabled() {
    const stored = localStorage.getItem('xOarena_sound');
    soundEnabled = stored !== 'false'; // default true
  }

  window.playSound = function(type) {
    if (!soundEnabled) return;
    const audio = sounds[type];
    if (!audio) return;
    // Reset and play
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Fallback: simple beep via oscillator if file missing
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = type === 'click' ? 800 : 600;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch(e) {}
    });
  };

  window.initSoundManager = function() {
    updateSoundEnabled();
    window.addEventListener('storage', updateSoundEnabled);
  };

  window.toggleSound = function(state) {
    localStorage.setItem('xOarena_sound', state ? 'true' : 'false');
    updateSoundEnabled();
  };
})();