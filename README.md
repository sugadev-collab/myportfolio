# Elakumar Sugatheepan — Portfolio

A lightweight, responsive single-page portfolio built using HTML, CSS and vanilla JavaScript. No build step, paid service, accounts, analytics or backend needed. Includes a warm cream default theme and a persistent dark mode, two original tiny SVG face icons (wide-eyed blinking face / sunglasses), card-edge glow, subtle CSS orbital animations, scroll-in section reveals, hover interactions, and a scroll-progress indicator. All motion respects `prefers-reduced-motion`; content remains visible when JavaScript is disabled.

## Site contents
- Introduction with contact links and a CV download
- Two featured deployed projects: Voidward Command and FormFit Image
- About, internship experience and education
- Technical skills grouped by area
- Contact section

## Run locally
Open `index.html` directly or serve the folder with `python -m http.server 8000` and visit `http://localhost:8000/`.

## Deploy for free
Repository: [`sugadev-collab/myportfolio`](https://github.com/sugadev-collab/myportfolio). All website files and assets live at the repository root. In Settings → Pages, use **Deploy from a branch → main → / (root)**. Your expected address will be `https://sugadev-collab.github.io/myportfolio/`. A `.nojekyll` file is included for static hosting. Alternatively use Cloudflare Pages → Connect to Git → framework **None**, no build command, output directory `.`.

## Update content
- `index.html` — name, introduction, projects, experience, skills, email and social links.
- `styles.css` — layout, colors, typography and responsive styles.
- `script.js` — theme toggle and preference storage, subtle pointer-responsive card glow, mobile menu, footer date, scroll reveals and scroll progress.
- `assets/Elakumar_Sugatheepan_CV.pdf` — latest downloadable CV. Replace when it changes.
- `assets/voidward-preview.webp` — screenshot of the user's own deployed game.
- `assets/formfit-preview.svg` — conceptual illustration of the resizer, **not an actual screenshot**.
- `assets/favicon.svg` — site icon.

## Accuracy and scope
Descriptions reflect the projects and CV supplied by the developer. Technologies used within the 3D game are not presented as mastered independent skills. FormFit preview is illustrative. No claims of a degree, certifications, employers beyond SGIC, or unverified project metrics are made.

After deployment, update the CV with the confirmed portfolio URL, and add it to the GitHub profile if desired.

## Design notes
- Default theme: warm off-white, crisp white cards, teal ink accents, subtle amber highlights. Dark theme: deep navy glass.
- The top-right animated face is a **button**: wide-open blinking eyes represent light mode, sunglasses represent dark mode. Click it to switch themes; the preference is stored only in browser `localStorage`.
- CSS-only effects and tiny inline SVGs keep the site lightweight. `prefers-reduced-motion` disables decorative movement. No icon fonts, frameworks or external CDNs.
