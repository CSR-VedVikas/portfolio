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
- Images: drop real files into `src/assets/images/` with these exact names, and the labelled placeholder boxes disappear:
  - `PLAYBOOK_SCREENSHOT.png` — home, Cursor Playbook entry
  - `ARCHITECTURE_DIAGRAM.png` — case study, architecture section
  - `SCREENSHOT_1.png` … `SCREENSHOT_4.png` — case study, screenshots grid
