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
- Images: all placeholders are filled — `PLAYBOOK_SCREENSHOT.png`, `SCREENSHOT_1.png` … `SCREENSHOT_5.png` (real app screenshots) and `ARCHITECTURE_DIAGRAM.png` (a rendered SVG of the documented topology, editable via `public/architecture-source.html`; drop your own file with the same name to replace it).
- Social share: `public/og-image.png` (1200x630) and `public/icon-180.png`, regenerable from `og-image-source.html` / `icon-source.html`. The canonical, og:url, og:image and sitemap absolute URLs are commented out in `index.html` until the site has its production domain; a sitemap is not shipped for the same reason.
- Certificates: `public/Mastercard_Cybersecurity_Simulation_Certificate.pdf` is linked from the Mastercard row.
- Demo video: `public/cursor-demo.mp4` (720p web encode) is embedded on `/playbook` in the Demo section.
