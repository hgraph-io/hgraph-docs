# AGENTS.md

## Overview
This repository contains a Docusaurus‑based documentation site. All source files are located in `docs/` and the production build is output to `build/`.

## Setup
```bash
npm install
npm run start   # dev server at http://localhost:3000
```

## Validate
```bash
npm run build   # production build, watch for warnings
npm run serve   # preview build
```
* Fix any "broken link" warnings.
* If TS/JS files changed: `npm run typecheck`

## PR Guidelines
* Base branch: `main`
* Create a new branch for your work and submit PRs from that branch.
* Keep PRs small and focused.
* Use clear commit/PR titles (e.g. `Docs: ...`).
* Follow existing Markdown style and front‑matter conventions.

## Agent Tips
* Work in `docs/`; the sidebar is auto‑generated from the folder structure.
* Ensure each MD/MDX file has proper front‑matter (`title`, `sidebar_position`, optional `slug`).
* After changes, rerun build/serve to catch link or syntax errors.
