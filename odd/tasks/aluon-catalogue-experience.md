# ALUON Catalogue Experience

## Objective
Rebuild `/servicios` as a catalogue-led, premium product discovery and conversion experience using the official ALUON catalogue as the source of truth.

## Authorized scope
- Frontend UI and product discovery only.
- Preserve existing routes, `/api/public/products`, and backend contracts.
- Use official catalogue: https://aluon.es/wp-content/uploads/2026/11/Catalogo-Aluon-Aluminio-Soldado.pdf
- UI copy in neutral Castilian Spanish.

## Checklist
- [x] Inspect the official 23-page catalogue visually and document the text-extraction limitation.
- [x] Rebuild `/servicios` information architecture and product presentation using only existing model payloads and local ALUON assets.
- [x] Improve consultation intent and preserve the model-to-contact query parameter.
- [x] Verify responsive behavior, accessibility structure, build, diff hygiene, and browser rendering if available.
- [x] T11 — Distill catalogue discovery to a three-click path with visible imagery and minimal decision copy.
- [x] T12 — Use the supplied official PDF imagery as art-directed web assets rather than raw catalogue pages.

## Constraints and acceptance criteria
- Write only `frontend/src/pages/ProductsPage.tsx`, `frontend/src/styles.css`, this task document, and curated PDF-derived assets plus their provenance documentation under `frontend/public/catalogue/`.
- Do not change routes, backend behavior, API contracts, or other repository files; do not commit.
- Keep model names, descriptions, imagery, and factual claims grounded in the existing public product payload/local ALUON assets. Do not infer product performance or technical specifications from low-resolution catalogue art.
- Provide a Spanish (Spain) editorial catalogue with five intent entry points, useful family hierarchy, model details, and contextual contact links preserving `/contacto?producto=...`.
- Support semantic landmarks, keyboard use, visible focus, reduced motion, responsive layouts, and explicit loading/error/empty/no-match states.
- Strict TDD is enabled for this task. The repository has no configured test script; use focused inline Node structural assertions as the available test runner, establish a failing RED before source implementation, then GREEN and REFACTOR. `npm run build` remains mandatory.

## Route and trigger
- Route: delegated direct, one writer.
- Trigger evidence: implementation spans the page component and catalogue styles, with this progress document maintained before source changes.
- No SDD artifacts or commit are in scope.

## Checks
- `npm run build`
- `git diff --check`
- Playwright visual review at desktop and mobile sizes.

## Progress
- The task document was read and merged before source edits; its original objective, scope, checks, and progress note are retained.
- Official PDF downloaded and verified as 23 pages. It is image-based: `pdftotext` returns only page separators. A rendered contact sheet was inspected; it shows ALUON gate, wicket/door, enclosure, and residential examples, but not legible text sufficient to verify detailed model/specification mappings.
- The catalogue API shape already supplies product `name`, `shortDescription`, `description`, and `imageUrl`; local product image assets exist. These remain the source of model-specific detail.
- TDD mode: strict, from user-provided session instruction. Available runner: inline Node structural assertions (the root `package.json` exposes build only, no test script). RED must be observed before the component/style implementation.
- RED observed before source implementation: inline Node assertion requiring the intent-selector definition failed against the current generic page (`AssertionError: catalogue intent selector must be implemented`).
- The local Vite server responds, but its `/api/public/products` request falls back to the app shell; no live product payload is available in this workspace. Runtime product details therefore remain sourced from the existing API contract, with family classification based only on available model text.
- Implementation complete: `/servicios` now has an editorial catalogue hero, five intent entry points, search, family grouping, contextual model CTAs, and Castilian Spanish copy.
- GREEN/REFACTOR complete: `npm run build` and `git diff --check` pass; nested `<main>` was corrected after the browser accessibility snapshot exposed it.
- Browser review complete at `output/playwright/aluon-services-restructured.png` with 0 console errors. Full product-card rendering remains pending because the local backend/API is unavailable at `localhost:8080`; the loading/error/empty/no-match states remain explicit and verified.
- User feedback: the first catalogue pass is too information-dense, does not expose imagery clearly enough, and does not meet the intended three-click discovery rule.
- Official PDF supplied locally at `/Users/rodrigo/Downloads/Catalogo-Aluon-Aluminio-Soldado.pdf`; visual render confirms 23 pages with model/application imagery and diagrams suitable for curated crops.
- Current pass authorized: use the supplied local PDF to art-direct web-ready product imagery under `frontend/public/catalogue/`; document source pages and crop treatment there. Keep all PDF-derived assets out of the source PDF's original page-layout form.
- Current pass acceptance: image-led first viewport; brief intro; family/intention selection immediately followed by visual models; model consultation preserves `/contacto?producto=...` within at most three actions. Search remains secondary, while API and honest local fallback states both remain available.
- Current pass exploration: rendered and visually inspected all 23 pages with `pdftoppm`; pages 3–20 contain distinct ALUON application scenes and named families/models, while pages 1–2 and 21–23 are cover, brand, map, and closing content. High-resolution review confirms reusable photographic compositions, not a reliable source for technical claims beyond visible model names.
- TDD RED observed for this pass: inline Node structural assertion failed because `frontend/public/catalogue/source.md` does not yet exist. Strict TDD remains active; implementation must turn this assertion GREEN and refactor without leaving unrelated files modified.

- T11/T12 complete — the catalogue now leads with curated crops, short model labels, and one consultation action per model; the fallback remains visual even when the API is unavailable.
- Verification after implementation: `npm run build`, `git diff --check`, Playwright desktop and mobile captures, 0 console errors, and a single `main` landmark in the browser snapshot.
- Evidence: `output/playwright/aluon-services-crops-desktop.png`, `output/playwright/aluon-services-crops-mobile.png`, and `frontend/public/catalogue/source.md`.

- Previous delegation capacity blocker resolved: a writer produced the implementation and the parent verified the changed files and assets.
