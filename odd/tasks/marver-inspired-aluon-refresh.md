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
- [ ] T5 — Rebuild the premium brand direction across the landing experience and consent layer, then verify it in a real browser.
- [ ] T6 — Restructure the full public website around a coherent premium information architecture and reusable visual system.
- [ ] T7 — Rebuild the shared SiteLayout as the premium navigation and brand frame for all public routes.
- [ ] T8 — Rework the homepage direction and standardise all homepage copy to neutral Castilian Spanish.

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
- T5 authorized — user explicitly raised the quality bar and requested a deeper premium redesign rather than another cosmetic pass.
- T5 in progress — the user approved narrowing the next step to `HomePage.tsx`; the premium landing slice is implemented, while the cookie-consent layer remains a separate follow-up.
- T6 authorized — user clarified that the requirement is a complete restructuring of the website, not a homepage-only visual pass.
- T6 blocked — the delegated shared-foundation writer timed out without editing source files; no full restructuring has been applied yet.
- T7 authorized — user approved starting the restructuring with `SiteLayout.tsx` as the first single-file phase.
- T8 authorized — user explicitly requested focusing on Inicio and removing Argentine/Rioplatense wording from the interface.
- T7 complete — rebuilt the shared brand frame, responsive navigation, footer narrative, mobile drawer focus behavior, and inert background handling in `SiteLayout.tsx`; restored Material Symbols rendering in the global stylesheet.
- T8 complete — reworked the Inicio page around a calmer editorial composition and replaced Rioplatense copy with neutral Castilian Spanish.

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

## Premium redesign pass
- Context: `PRODUCT.md` and `DESIGN.md` define the brand register and quality bar for this pass.
- Principle: rebuild composition and narrative, not just colors, cards, or button styles.
- HomePage slice — implemented a material-led hero, editorial project story, collection gallery, guided principles, and stronger closing CTA using existing ALUON assets.
- Verification — `npm run build` and `git diff --check` passed; browser screenshot captured at `output/playwright/aluon-premium-pass.png`. Cookie banner overlap is visible and remains outside this narrowed slice.

## Shared shell phase
- `npm run build` — passed; only the existing Browserslist data freshness warning remains.
- `git diff --check` — passed.
- Browser screenshot — `output/playwright/aluon-shell-icons-fixed.png`; verified the new utility bar, brand lockup, navigation hierarchy, project CTA, and working icon ligatures.
- Accessibility — focus return and inert background handling are implemented in code; a full assistive-technology walkthrough remains pending.

## Homepage language and direction phase
- `frontend/src/pages/HomePage.tsx` now uses a split material-led hero, project narrative, collections, guided journey, and closing contact section.
- Homepage copy uses Spain Spanish: `descubre`, `define`, `encuentra`, `cuéntanos`, `necesitas`, and no `vos`, `querés`, `acá`, or `explorá` forms.
- `npm run build` — passed; only the existing Browserslist data freshness warning remains.
- Browser screenshot — `output/playwright/aluon-home-castilian-final2.png`; CTA is visible within the viewport and the page title/copy are legible.
- Route: delegated direct. The bounded writer handoff is authorized; this pass changes three non-trivial frontend files and the existing recovery document, and reading the required design/code context prepares that coordinated write.
- Authorized scope: `frontend/src/pages/HomePage.tsx`, `frontend/src/shared/ui/CookieBanner.tsx`, `frontend/src/styles.css`, and this task document only. Preserve routes, API behavior, mobile navigation, semantic HTML, focus visibility, reduced motion, and responsive behavior. Use existing local ALUON imagery and fonts only; do not add dependencies or invent quote/backend capabilities. No commit in this writer pass.
- TDD and runner: TDD is enabled for this session per the existing task record. The root `package.json` exposes `build`, `dev`, and `preview`, but no test script; no separate test command is inferred. The available verification runner is `npm run build`.
- Applicable checks: `npm run build`, `git diff --check`, and structural review of the changed components. Browser/responsive visual verification is intentionally deferred to the parent; T3 stays pending until that review is complete.
- Route trigger: delegated writer route because the requested homepage, consent layer, and shared styling are coordinated, non-trivial changes; browser review is explicitly outside this writer pass.
