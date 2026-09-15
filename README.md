# Smart Snap — by CyberHayde

Turns up to 100 photos or scans into a single Word document. All OCR runs
on-device using a bundled copy of Tesseract.js — no server, no external
CDN calls, works offline after the first load.

## Features

- Up to 100 images per batch, read in parallel across several OCR workers
- Take a photo directly (mobile) or upload from gallery/files
- Reorder pages with the up/down arrows before running OCR
- Optional on-device image enhancement (grayscale + contrast + downscale)
  before OCR — usually improves accuracy and speed, can be turned off
- A **review step** after OCR: edit each page's title and text, see a
  confidence score per page, and re-read any single page that came out
  wrong — before anything is exported
- Export as a single .docx or a plain .txt
- Installable PWA, works fully offline after first load

## Deploying to GitHub Pages

1. Copy every file in this folder (`index.html`, `manifest.json`, `sw.js`,
   `assets/`, `icons/`) into your repo — e.g. the root of
   `cyberhayde/CyberHayde`, or a subfolder like `smart-snap/` if you want
   it alongside other projects.
2. Commit and push.
3. In the repo's **Settings → Pages**, set the source to the branch/folder
   you pushed to.
4. Visit the published URL. On first load it fetches nothing external —
   everything (including the ~14MB OCR engine and language data) is
   already in the repo, so it works even if the visitor is offline right
   after the page finishes loading once.

### If you deploy into a subfolder

Every path in `index.html`, `manifest.json`, and `sw.js` is written as a
**relative** path (no leading `/`), so the app works correctly whether it's
served at your domain root or at a sub-path like
`https://cyberhayde.github.io/CyberHayde/smart-snap/`. No edits needed.

## Updating the OCR language

This build only includes English (`eng`). To add another language, download
that language's `<code>.traineddata.gz` from the
`@tesseract.js-data` npm package matching the code, drop it in
`assets/vendor/tesseract/lang-data/`, then pass the language code to
`Tesseract.createWorker(...)` in `index.html`.

## File sizes

The `assets/vendor/tesseract/` folder is the bulk of the app (~14MB) — it's
the WebAssembly OCR engine plus the English language model, bundled so the
app is fully self-contained and works offline.
