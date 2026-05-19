// xOarena/js/preloader.js
(function() {
  window.initPreloader = function() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const isPreloaderEnabled = () => {
      const stored = localStorage.getItem('xOarena_preloader');
      return stored !== 'false'; // default true
    };

    const hidePreloader = () => {
      preloader.classList.add('hidden');
      setTimeout(() => { if (preloader) preloader.style.display = 'none'; }, 500);
    };

    if (!isPreloaderEnabled()) {
      preloader.style.display = 'none';
      return;
    }

    const minDuration = 3000; // 3 seconds minimum
    const startTime = Date.now();

    const tryHide = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= minDuration) {
        hidePreloader();
      } else {
        setTimeout(hidePreloader, minDuration - elapsed);
      }
    };

    // Wait for load event, but also enforce 3 seconds minimum
    window.addEventListener('load', tryHide);
    setTimeout(tryHide, minDuration + 100); // fallback

    // Animate loading bar
    const bar = document.getElementById('preloaderBar');
    if (bar) {
      let progress = 0;
      const totalSteps = 100;
      const interval = minDuration / totalSteps;
      const progressInterval = setInterval(() => {
        progress++;
        bar.style.width = progress + '%';
        if (progress >= 100) clearInterval(progressInterval);
      }, interval);
    }

    // X vs O fight animation
    const fighterX = document.querySelector('.fighter-x');
    const fighterO = document.querySelector('.fighter-o');
    if (fighterX && fighterO) {
      let tick = 0;
      const fightInterval = setInterval(() => {
        tick++;
        // Random gentle movement
        fighterX.style.transform = `translate(${Math.random() * 30 - 15}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg)`;
        fighterO.style.transform = `translate(${Math.random() * -30 + 15}px, ${Math.random() * -20 + 10}px) rotate(${Math.random() * -20 + 10}deg)`;

        // Occasional clash (every ~500ms on average)
        if (tick % 5 === 0 && Math.random() > 0.6) {
          fighterX.classList.add('clash');
          fighterO.classList.add('clash');
          setTimeout(() => {
            fighterX.classList.remove('clash');
            fighterO.classList.remove('clash');
          }, 300);
        }
      }, 100);

      // Stop fight animation when preloader is hidden (not critical, but clean)
      const stopFight = () => {
        clearInterval(fightInterval);
        window.removeEventListener('load', stopFight);
      };
      window.addEventListener('load', stopFight);
      setTimeout(stopFight, minDuration + 500);
    }
  };
})();