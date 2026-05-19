// xOarena/js/theme.js
(function() {
  const THEME_KEY = 'xOarena_theme';
  const themes = ['light', 'dark', 'techy'];

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateActiveThemeButton(theme);
  }

  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  function updateActiveThemeButton(theme) {
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  window.initTheme = function() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(saved);

    // Attach listeners to theme selector if present (settings page)
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
      });
    });

    // Expose cycle function globally for keyboard shortcut and right-click
    window.cycleTheme = cycleTheme;
  };
})();