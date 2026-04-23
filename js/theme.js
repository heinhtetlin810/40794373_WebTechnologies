/* ================================================================
   theme.js — Dark / Light mode toggle for GeoQuester
   
   HOW TO USE:
   Add ONE line before </body> in index.html, quiz.html, leaderboard.html:
     <script src="js/theme.js"></script>
   
   That's it. The toggle button is injected into the nav automatically.
   ================================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'gq_theme';

  /* ── Determine saved or preferred theme ──────────────────────── */
  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    // Respect OS preference on first visit
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  /* ── Apply theme to <html> element ───────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem(STORAGE_KEY, theme);
    updateButtonLabel(theme);
  }

  /* ── Update button icon & label ──────────────────────────────── */
  function updateButtonLabel(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;

    if (theme === 'light') {
      btn.innerHTML = '<span class="icon">🌙</span><span class="theme-lbl">Dark</span>';
      btn.title     = 'Switch to dark mode';
    } else {
      btn.innerHTML = '<span class="icon">☀️</span><span class="theme-lbl">Light</span>';
      btn.title     = 'Switch to light mode';
    }
  }

  /* ── Apply theme immediately before page renders (no flash) ──── */
  applyTheme(getSavedTheme());

  /* ── Inject toggle button into .nav__links ───────────────────── */
  function injectButton() {
    // Guard: don't inject twice
    if (document.getElementById('themeToggleBtn')) return;

    const navLinks = document.querySelector('.nav__links');
    if (!navLinks) return;

    const btn = document.createElement('button');
    btn.id        = 'themeToggleBtn';
    btn.className = 'nav__link theme-toggle-btn';
    btn.setAttribute('aria-label', 'Toggle colour theme');
    btn.setAttribute('type', 'button');

    btn.addEventListener('click', function () {
      const current = localStorage.getItem(STORAGE_KEY) || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    navLinks.appendChild(btn);

    // Set correct label for current theme
    updateButtonLabel(getSavedTheme());
  }

  /* Run after DOM is parsed */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }

})();
