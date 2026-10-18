/** Sideways Studies — a minimal native scroll-snap chapter controller. */
const track = document.getElementById('track');
const panels = [...track.querySelectorAll('.panel')];
const chapterLinks = [...document.querySelectorAll('[data-go]')];
const navLinks = [...document.querySelectorAll('.chapters a')];
const dots = [...document.querySelectorAll('.dot')];
const currentLabel = document.getElementById('current-number');
const previous = document.getElementById('prev');
const next = document.getElementById('next');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let wheelCooldown = 0;
let wheelAccum = 0;
let scrollTicking = false;

function goTo(index, updateHash = true) {
  const target = Math.max(0, Math.min(panels.length - 1, index));
  track.scrollTo({ left: target * track.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  setActive(target);
  if (updateHash) history.replaceState(null, '', `#${panels[target].id}`);
}
function setActive(index) {
  current = Math.max(0, Math.min(panels.length - 1, index));
  currentLabel.textContent = String(current).padStart(2, '0');
  previous.disabled = current === 0;
  next.disabled = current === panels.length - 1;
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === current);
    if (i === current) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
  navLinks.forEach((link, i) => {
    if (i === current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
chapterLinks.forEach(link => link.addEventListener('click', event => {
  if (link.tagName === 'A') event.preventDefault();
  goTo(Number(link.dataset.go));
}));
previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));

// Ordinary vertical mouse-wheel gestures advance the sideways story, one chapter
// at a time. Touchscreens retain native horizontal swipe and scroll snapping.
track.addEventListener('wheel', event => {
  if (event.ctrlKey || event.metaKey) return; // Preserve browser zoom.
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.2) return; // Native horizontal trackpads.
  if (Math.abs(event.deltaY) < 2) return;
  // Wheel navigation always moves between chapters on regular screens.
  // Only extremely short phones allow a small amount of internal scrolling.
  const section = panels[current];
  if (((window.innerWidth <= 800 && window.innerHeight <= 560) || (window.innerWidth <= 400 && window.innerHeight <= 620)) && section.scrollHeight > section.clientHeight + 3) {
    const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 3;
    const atTop = section.scrollTop <= 3;
    if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) {
      section.scrollTop += event.deltaY;
      event.preventDefault();
      return;
    }
  }
  event.preventDefault();
  const now = performance.now();
  if (now < wheelCooldown) return;
  wheelAccum += event.deltaY;
  if (Math.abs(wheelAccum) < 26) return;
  const direction = Math.sign(wheelAccum);
  wheelAccum = 0;
  wheelCooldown = now + 650;
  goTo(current + direction);
}, { passive: false });

window.addEventListener('keydown', event => {
  const target = event.target;
  if (target?.closest?.('input,textarea,select,[contenteditable="true"]')) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); goTo(current + 1); }
  else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goTo(current - 1); }
  else if (event.key === 'Home') { event.preventDefault(); goTo(0); }
  else if (event.key === 'End') { event.preventDefault(); goTo(panels.length - 1); }
});
track.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const index = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    setActive(index);
    scrollTicking = false;
  });
}, { passive: true });
window.addEventListener('resize', () => {
  track.scrollTo({ left: current * track.clientWidth, behavior: 'instant' });
});
// Honor direct links to a chapter without causing an ordinary vertical jump.
const initialIndex = panels.findIndex(p => `#${p.id}` === decodeURIComponent(location.hash));
if (initialIndex > 0) requestAnimationFrame(() => goTo(initialIndex, false));
else setActive(0);
window.addEventListener('hashchange', () => {
  const i = panels.findIndex(p => `#${p.id}` === decodeURIComponent(location.hash));
  if (i >= 0) goTo(i, false);
});

// Tiny illustrated face — wide-eyed light mode, sunglasses dark mode.
const toggle = document.getElementById('theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
function syncTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  const title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  toggle.setAttribute('aria-label', title);
  toggle.title = title;
  themeMeta?.setAttribute('content', dark ? '#121d1d' : '#f7f4ec');
}
toggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem('es-portfolio-theme', nextTheme); } catch (_) {}
  syncTheme();
});
syncTheme();

// Ambient spotlight follows the cursor, while the thin animated project border
// is visible even without hovering. Pointer-tracking is purely decorative.
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion.matches) {
  document.querySelectorAll('.showcase-card').forEach(card => card.addEventListener('pointermove', event => {
    const box = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${event.clientX - box.left}px`);
    card.style.setProperty('--glow-y', `${event.clientY - box.top}px`);
  }, { passive: true }));
}