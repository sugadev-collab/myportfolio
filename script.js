// Theme is a preference, not a separate page. The inline head script applies it
// before first paint; this button toggles and persists it for future visits.
const themeToggle = document.getElementById('theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
function syncThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeColor?.setAttribute('content', dark ? '#0a111c' : '#fffaf2');
}
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('es-portfolio-theme', next); } catch (_) { /* Still works without storage. */ }
  syncThemeControl();
});
syncThemeControl();

// A restrained pointer-follow glow appears only over project cards. No interval
// or continuous JavaScript animation is used.
const canTrackGlow = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canTrackGlow) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
}

// Lightweight page enhancements. Nothing here is required to read the content.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('primary-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
const desktopQuery = window.matchMedia('(min-width: 901px)');
desktopQuery.addEventListener?.('change', event => { if (event.matches) closeMenu(); });
document.getElementById('year').textContent = String(new Date().getFullYear());

// The top progress line moves only when the page scrolls; it does not animate endlessly.
const scrollProgress = document.querySelector('.scroll-progress');
let scrollFramePending = false;
function updateScrollProgress() {
  scrollFramePending = false;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
}
function requestScrollProgress() {
  if (scrollFramePending) return;
  scrollFramePending = true;
  window.requestAnimationFrame(updateScrollProgress);
}
window.addEventListener('scroll', requestScrollProgress, { passive: true });
window.addEventListener('resize', requestScrollProgress, { passive: true });
requestScrollProgress();

// IntersectionObserver reveals content only as it becomes visible.
// If JS is blocked, observers are unavailable, or reduced motion is requested,
// all sections remain visible with no transition.
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotionQuery.matches) {
  const revealItems = document.querySelectorAll(
    '.section-heading, .project-card, .about-side, .about-body, .timeline-item, .skill-group, .contact-wrap'
  );
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
  revealItems.forEach(item => {
    item.classList.add('reveal-on-scroll');
    revealObserver.observe(item);
  });
  document.documentElement.classList.add('motion-enabled');

  // Respect a setting changed while the page is open.
  reducedMotionQuery.addEventListener?.('change', event => {
    if (event.matches) {
      document.documentElement.classList.remove('motion-enabled');
      revealObserver.disconnect();
    }
  });
}
