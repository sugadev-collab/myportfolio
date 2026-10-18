# Sideways Studies — Elakumar Sugatheepan

A creative, horizontal single-page developer portfolio. Six full-screen chapters tell a story from introduction to shipped work, internship, current skills and contact. Built with pure HTML, CSS and JavaScript, with no build step, paid services, or external dependencies.

## Live site

**Portfolio website:** https://sugadev-collab.github.io/myportfolio/

**Status:** Published from `main` on GitHub Pages; latest horizontal-layout fixes are included.

**Source code:** https://github.com/sugadev-collab/myportfolio

**Featured projects:** [Voidward Command (live game)](https://mygamesorg.github.io/SpaceClash/) · [FormFit Image (live tool)](https://formfit-image.pages.dev/)

## Navigation

- **Desktop:** mouse wheel advances a chapter sideways. Horizontal trackpad swipes work natively. Use top navigation, arrows and chapter dots at the bottom, or Left/Right, PageUp/PageDown, Home/End keys.
- **Mobile/tablet:** swipe left/right between chapters; use the chapter navigation bar and next/previous controls. Scrollbars are hidden; native horizontal scroll-snap remains available.
- **Short screens / zoom:** individual panels can scroll internally to keep text and links reachable. The page itself never shows a vertical scrollbar.
- **Accessibility:** links have labels, focus indicators, keyboard support, semantic headings, and `prefers-reduced-motion` disables ornamental animation.

## Design

- Warm paper default, rich jade and ochre accents, and deep-navy dark theme.
- Animated editorial monogram/orbit on opening chapter; softly illuminated project stages, always-visible sweeping luminous frames and interactive spotlight.
- Tiny SVG wide-eyed blinking face for light mode and sunglasses face for dark mode. Theme preference is stored in browser `localStorage` (no backend).
- Six chapters: Start, Voidward Command, FormFit Image, Story, Toolkit, Contact.
- Real screenshot of Voidward Command. FormFit illustration is **conceptual**, not a screenshot.

## Files

- `index.html`: semantic content, chapters, illustrations, project and contact links
- `styles.css`: responsive layout, animation and theme palette
- `script.js`: horizontal scroll control, active section state, theme, pointer effects
- `assets/voidward-preview.webp`: game screenshot
- `assets/formfit-preview.svg`: conceptual tool illustration
- `assets/Elakumar_Sugatheepan_CV.pdf`: downloadable CV (replace this file when the CV is revised)
- `assets/favicon.svg`: icon

## Development and publishing

Run `python -m http.server 8000` in the repo root and visit http://localhost:8000/; or open `index.html` directly.

GitHub Pages → Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## Factual accuracy

Descriptions are grounded in the developer's CV and published projects. The game was directed, tested and deployed with AI-assisted implementation; Three.js/WebGL are not listed as independent mastered skills. SGIC internship is Jan–Aug 2026. Vocational coursework is an NVQ Level 4 **pathway**, not a claimed completed certification.

## Layout fixes (October 2026)

- Removed forced minimum heights on normal laptop and tablet screens that caused chapter headings to disappear during mouse-wheel navigation.
- Compact layouts fit between the navigation and footer; on extremely short phones hidden-scrollbar overflow remains reachable.
- All chapters respond consistently to light/dark themes. Game artwork remains dark because the screenshot itself is dark.
- Centered the blinking-eyes and sunglasses icons, preserved horizontal navigation, and versioned CSS/JS assets to avoid stale caches.
- Tested responsive chapter bounds and wheel/keyboard navigation in Chromium at laptop, tablet and phone viewport sizes.