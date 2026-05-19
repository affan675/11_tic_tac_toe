// xOarena/js/tabWelcome.js
(function() {
  window.initTabWelcome = function() {
    let originalTitle = document.title;
    let hiddenTime = null;

    // Update original title if it ever changes (e.g., single-page navigation)
    const titleObserver = new MutationObserver(() => {
      if (!document.hidden) {
        originalTitle = document.title;
      }
    });
    const titleEl = document.querySelector('title');
    if (titleEl) {
      titleObserver.observe(titleEl, { childList: true });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // User left the tab – change title
        document.title = '💬 Come back, we miss you! — X O Arena';
        hiddenTime = Date.now();
      } else if (hiddenTime && Date.now() - hiddenTime > 500) {
        // User returned – restore title and show toast
        document.title = originalTitle;
        showToast('Welcome back, Affan! 👋');
        hiddenTime = null;
      } else if (hiddenTime) {
        // Returned too quickly (less than 500ms) – just restore title
        document.title = originalTitle;
        hiddenTime = null;
      }
    });

    function showToast(message) {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };
})();