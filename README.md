# C S R VedVikas — Portfolio

Static, single-page portfolio with one case-study page (`/forgefit`). Built with React, Vite and Tailwind CSS. No backend, no database, no forms, no analytics of its own. The only motion on the site is a 120ms colour change on link and button hover.

## Run

```bash
yarn install
yarn start      # dev server on :3000
yarn build      # production build in dist/
```

## Content

- Copy lives in `src/pages/Home.jsx` and `src/pages/ForgeFit.jsx`; links live in `src/data/site.js`.
- Résumé: `public/VedVikas_CV.pdf`, linked from the intro (`RESUME_PDF_PATH` in `src/data/site.js`).
- Images: `PLAYBOOK_SCREENSHOT.png`, `SCREENSHOT_1.png` … `SCREENSHOT_5.png` (real app screenshots), `ARCHITECTURE_DIAGRAM.png` (Docker Compose deployment view), `ARCHITECTURE_SERVICES.png` (integration map) and `ARCHITECTURE_MODULES.png` (backend module map) — all in `src/assets/images/`.
- ForgeFit demo video: embedded from YouTube (youtube-nocookie) in the Demo section on `/forgefit`, linked from the home entry.
- Social share: `public/og-image.png` (1200x630) and `public/icon-180.png`, regenerable from `og-image-source.html` / `icon-source.html`. The canonical, og:url, og:image and sitemap absolute URLs are commented out in `index.html` until the site has its production domain; a sitemap is not shipped for the same reason.
- Certificates: `public/Mastercard_Cybersecurity_Simulation_Certificate.pdf` is linked from the Mastercard row.
- Demo video: `public/cursor-demo.mp4` (720p web encode) is embedded on `/playbook` in the Demo section.
