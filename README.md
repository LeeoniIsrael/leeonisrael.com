# Leeon Israel — personal website

Next.js 15, React 19, TypeScript, Tailwind CSS 4, and shadcn-compatible components.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Reusable UI lives in `components/ui`; page sections live in `components/sections`; global styles and theme tokens live in `app/globals.css`. The existing `components.json` maps `@/components/ui` for shadcn, so no new CLI setup is required.

The scroll animation in `components/ui/container-scroll-animation.tsx` opens a composition of actual Kavanah onboarding screenshots as the section passes through the viewport, without pinning or extra scroll height. The production-style 3D name lives in `components/ui/name-3d.tsx` and uses CSS perspective plus shifting text shadows. Framer Motion controls section reveals, timeline, disclosures, filters, and dialogs. Lenis adds smooth wheel scrolling; touch remains native. Reduced-motion mode uses static layouts. Typography uses self-hosted Inter Variable across the whole site. The 3D playground and Spline dependencies have been removed.

Edit projects and current resume facts in `lib/portfolio.ts`. `lib/career.ts` merges those facts with the complete original career archive in `lib/experience-history.json`; `lib/project-history.json` preserves the original project reflections. Source notes are in `docs/content-sources.md`; design direction is in `docs/design.md`.

Every resume link serves the exact user-supplied PDF at `public/resume/leeon-israel.pdf`. The same file is preserved at `public/resume/leeon-israel-original.pdf` and the legacy `/screenshots/resume.pdf` route. `scripts/build-resume.py` is an earlier editorial experiment and should not regenerate the linked resume.

All portrait, project, and resume assets are local. Development preview does not publish the site.

## Browser checks

After `npm run build`, run `npm run test:e2e`. Install the browser once with `npx playwright install chromium`, or use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` with Google Chrome installed. The tests cover project filtering, native dialog focus and dismissal, resume delivery, experience disclosures, five responsive widths, mobile navigation, both themes, reduced motion, WCAG accessibility scans, and visible scroll animation ranges. The test server uses port 3100.

Next.js is patched to 15.5.27; a compatible PostCSS 8.5.28 override removes the vulnerable bundled transitive version. Removed the unused legacy cursor, particle, Three.js, and GSAP code.

Project preview format is defined in `components/ui/project-visual.tsx`: complete vertical Kavanah screenshots, horizontal web screenshots, and a shared vector logo system for projects without a current interface. RentConnect’s earlier mobile mockup is not used for its newer agent prototype. The footer combines contact and navigation with an original generated New York etching at `public/images/footer-waterfront.webp`.

Desktop index previews live in `components/ui/project-peek.tsx`. `components/ui/project-dialog.tsx` handles persistent project navigation, keyboard controls, screenshot inspection, Kavanah screen selection, and focus restoration. Hover and screen transitions respect reduced motion. The theme toggle uses a native View Transition when supported and falls back to a direct theme change.
