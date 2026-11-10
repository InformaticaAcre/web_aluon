# ALUON Marver-Inspired Frontend Refresh

## Objective
Improve the ALUON public website using the Marver and Portalum reference material in `/Users/rodrigo/Desktop/COMPETENCIA` as visual and product influence, without copying branding or expanding into backend work.

## Problem
The current frontend has a functional React shell but a generic visual language and weak product/quote journey compared with the supplied reference material.

## Authorized scope
- Frontend UI only.
- Reference material: `/Users/rodrigo/Desktop/COMPETENCIA` and subfolders.
- Preserve existing routes and backend contracts.
- Do not copy protected logos, text, or assets directly; adapt patterns and use ALUON assets.

## Checklist
- [x] T1 — Establish a stronger ALUON visual system inspired by reference hierarchy, spacing, imagery, and CTA patterns.
- [x] T2 — Refresh the shared site shell/navigation/footer and homepage experience.
- [ ] T3 — Verify build, responsive behavior, accessibility basics, and visual regressions.
- [x] T4 — Apply a second reference-fidelity pass from the three Marver HTML flows without copying their branding or inventing backend capabilities.

## Acceptance criteria
- Existing routes continue to render.
- Homepage and shared shell feel intentional, premium, and product-led.
- Mobile navigation remains usable and keyboard accessible.
- No invented backend endpoints or broken asset paths.
- `npm run build` passes.

## Checks
- `npm run build`
- Structural review of changed components.
- Browser/visual review if a browser runner is available.

## Implementation slice — first bounded UI pass
- Route: delegated direct; the shared shell, homepage, and visual tokens require coordinated edits across multiple non-trivial files.
- TDD: enabled for this session; repository has no test script, so no test command is inferred. Run the explicitly available `npm run build` check and structural review.
- Expected authored change: approximately 250–400 lines across the shell, homepage, and styles; no artificial line cap.
- Delivery: no commit in this delegated slice; the parent will review and commit the work unit.
- Scope for this pass: shared `SiteLayout`, `HomePage`, and global styles only; preserve routes, API contracts, mobile navigation, and ALUON assets.

## Progress
- T1 complete — added warm neutral/red design tokens, editorial typography hierarchy, responsive product cards, hero, story, CTA, footer, focus states, and reduced-motion handling in `frontend/src/styles.css`.
- T2 complete — refreshed `frontend/src/layouts/SiteLayout.tsx` and `frontend/src/pages/HomePage.tsx` while preserving existing routes, local assets, mobile drawer navigation, and API behavior.
- T3 pending — build, structural, and browser/visual verification.
- T4 authorized — use the three supplied Marver HTML documents as direct UX/style influence for a focused refinement pass.

## Next step
- Build and structural checks pass for this slice; T3 remains pending for a real browser/visual review and responsive interaction walkthrough.

## Evidence — first bounded UI slice
- `npm run build` — passed (`tsc -p tsconfig.app.json --noEmit && vite build`). Vite emitted only the existing Browserslist freshness warning.
- Structural review — passed: stylesheet restored with Tailwind directives and selectors for all new shell/home classes; native links/buttons remain keyboard focusable; mobile navigation retains Escape handling, focus return, and focus containment; `prefers-reduced-motion` is covered.
- Browser/visual review — unavailable in this pass; no browser session was run. T3 intentionally remains pending.

## Second reference-fidelity pass
- Scope: the three supplied Marver HTML references, existing ALUON homepage and shared shell; frontend only.
- Constraint: improve hierarchy and product discovery while preserving ALUON identity, routes, and API contracts.
- T4 complete — refreshed product discovery and quote-intent cues across `ProductsPage.tsx`, `ShopPage.tsx`, and `ContactPage.tsx`, with shared styles in `frontend/src/styles.css`.
- `npm run build` — passed (`tsc -p tsconfig.app.json --noEmit && vite build`); only the existing Browserslist data freshness warning was emitted.
- `git diff --check` — passed.
- Browser/visual spot-check — screenshots captured at `output/playwright/aluon-catalog.png` and `output/playwright/aluon-contact-mobile.png`. Review found the cookie-consent banner obscures page content in both captures; the broader responsive, keyboard, and accessibility walkthrough is incomplete. T3 remains pending until these issues and checks are resolved.
