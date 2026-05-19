// xOarena/js/customCursor.js
(function() {
  let cursorContainer = null;
  let dot = null;
  let ring = null;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let speed = 0.2; // ring catch-up speed (lower = more lag)

  let enabled = true;
  let hovering = false;

  function createCursorElements() {
    cursorContainer = document.getElementById('customCursor');
    if (!cursorContainer) return;

    // Clear any existing content
    cursorContainer.innerHTML = '';

    // Create dot
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    cursorContainer.appendChild(dot);

    // Create ring
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    cursorContainer.appendChild(ring);
  }

  function updateEnabled() {
    const stored = localStorage.getItem('xOarena_cursor');
    enabled = stored !== 'false'; // default true
    if (cursorContainer) {
      cursorContainer.style.display = enabled ? 'block' : 'none';
    }
    document.body.classList.toggle('custom-cursor-disabled', !enabled);
    // If disabled, restore native cursor on body (CSS will handle)
  }

  function animate() {
    if (!enabled || !ring) return;

    // Smooth ring movement (magnetic lag)
    ringX += (mouseX - ringX) * speed;
    ringY += (mouseY - ringY) * speed;

    // Apply positions
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    requestAnimationFrame(animate);
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot moves immediately via animate loop
  }

  function onMouseEnterInteractive() {
    hovering = true;
    if (ring) ring.classList.add('hovering');
    if (dot) dot.classList.add('hovering');
  }

  function onMouseLeaveInteractive() {
    hovering = false;
    if (ring) ring.classList.remove('hovering');
    if (dot) dot.classList.remove('hovering');
  }

  function attachHoverListeners() {
    const hoverTargets = 'button, .cell, .nav-icon, .feature-card, .tab-btn, .theme-option, .bot-list-item, a, .btn, .toggle-slider';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });
  }

  window.initCustomCursor = function() {
    createCursorElements();
    if (!cursorContainer) return;

    updateEnabled();
    attachHoverListeners();

    // Update hover listeners dynamically (in case content changes)
    const observer = new MutationObserver(() => attachHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', onMouseMove);
    animate();

    window.addEventListener('storage', updateEnabled);
  };

  // Expose toggle function for settings
  window.toggleCustomCursor = function(state) {
    localStorage.setItem('xOarena_cursor', state ? 'true' : 'false');
    updateEnabled();
  };
})();