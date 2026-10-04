# Leeon Israel — personal website

Next.js 15, React 19, TypeScript, Tailwind CSS 4, and shadcn-compatible components.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Reusable UI lives in `components/ui`; page sections live in `components/sections`; global styles and theme tokens live in `app/globals.css`. The existing `components.json` maps `@/components/ui` for shadcn, so no new CLI setup is required.

The landing hero uses `components/ui/minimalist-hero.tsx`, Leeon's transparent portrait, and a shared circle/portrait fade. Clicking this sole page portrait opens `components/ui/portrait-doodle.tsx` for temporary drawing and fixed sunglasses. About is text-only; the header uses a “Leeon.” wordmark. `components/ui/name-3d.tsx` is retained but no longer used by the hero.

Kavanah, ONHAND, and Signify use distinct, normal-flow scroll compositions without pinning or extra scroll height. `components/ui/phone-screen.tsx` supplies identical iPhone hardware across showcases and inspection. Framer Motion controls motion and disclosures; Lenis smooths wheel scrolling while touch remains native. Reduced motion uses static layouts. Typography is self-hosted Inter Variable.

Edit projects and current resume facts in `lib/portfolio.ts`. `lib/career.ts` merges those facts with the complete original career archive in `lib/experience-history.json`; `lib/project-history.json` preserves the original project reflections. Source notes are in `docs/content-sources.md`; design direction is in `docs/design.md`.

Every resume link serves the exact user-supplied PDF at `public/resume/leeon-israel.pdf`. The same file is preserved at `public/resume/leeon-israel-original.pdf` and the legacy `/screenshots/resume.pdf` route. `scripts/build-resume.py` is an earlier editorial experiment and should not regenerate the linked resume.

All portrait, project, and resume assets are local. Development preview does not publish the site.

## Browser checks

After `npm run build`, run `npm run test:e2e`. Install the browser once with `npx playwright install chromium`, or use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` with Google Chrome installed. The tests cover project filtering, native dialog focus and dismissal, resume delivery, experience disclosures, five responsive widths, mobile navigation, both themes, reduced motion, WCAG accessibility scans, and visible scroll animation ranges. The test server uses port 3100.

Next.js is patched to 15.5.27; a compatible PostCSS 8.5.28 override removes the vulnerable bundled transitive version. Removed the unused legacy cursor, particle, Three.js, and GSAP code.

Project preview format is defined in `components/ui/project-visual.tsx`: complete vertical mobile screenshots, horizontal web captures, and shared vector logos for projects without a current interface. The footer uses `components/ui/skyline-signature.tsx` with an engraved Bodoni wordmark and a detailed Lower Manhattan etching derived from an actual photograph. Light mode is blue; dark mode is charcoal. See `docs/real-manhattan-art.md` for art provenance.

Desktop index previews live in `components/ui/project-peek.tsx`. `components/ui/project-dialog.tsx` handles persistent project navigation, keyboard controls, screenshot inspection, project-specific screen selection, and focus restoration. Hover and screen transitions respect reduced motion. The theme toggle uses a native View Transition when supported and falls back to a direct theme change.

Mobile screen assets and their labels/dimensions are defined in `lib/project-screens.ts`. All nine supplied screens retain their original proportions and can be viewed with screen buttons or arrow keys.

The main showcase order is Kavanah, ONHAND, Signify. `components/ui/project-showcase.tsx` implements the latter two distinct, unpinned scroll compositions. Spotify Splitter is available through the project index.

The hero design, portrait cutout source, and complete imagegen prompt are documented in `docs/minimalist-hero.md`. Previous footer experiments remain unused.
