// xOarena/js/common.js
(function() {
  function highlightCurrentNav() {
    const path = window.location.pathname.split('/').pop();
    const pageMap = {
      'index.html': 'home',
      'two_players.html': 'two_players',
      'ai.html': 'ai',
      'learn.html': 'learn',
      'settings.html': 'settings',
      'creator.html': 'creator'
    };
    const currentPage = pageMap[path] || 'home';
    document.querySelectorAll('.nav-icon').forEach(link => {
      const linkPage = link.dataset.page;
      link.classList.toggle('active', linkPage === currentPage);
    });
  }

  function attachGlobalClickSound() {
    document.addEventListener('click', function(e) {
      const target = e.target;
      if (target.closest('button, .nav-icon, .cell, .feature-card, .tab-btn, .theme-option')) {
        if (window.playSound) window.playSound('click');
      }
    });
  }

  window.initCommon = function() {
    highlightCurrentNav();
    attachGlobalClickSound();
  };
})();