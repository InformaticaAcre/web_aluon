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
- [ ] Verify responsive behavior, accessibility structure, build, diff hygiene, and browser rendering if available.

## Constraints and acceptance criteria
- Write only `frontend/src/pages/ProductsPage.tsx`, `frontend/src/styles.css`, and this task document.
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
