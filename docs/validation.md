# Validation — October 2, 2026

- `npm run build`: passes; statically prerendered page, 196 kB first-load JavaScript. No Spline runtime or external 3D scene.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: all nine suites pass. Covers all 14 project dialogs and focus restoration, category filters, all 10 career entries, preserved older stories, all 14 courses, resume response, five widths (320–1440px), mobile navigation, both themes, and reduced motion.
- Production-style 3D name: pointer movement changes perspective and depth shadows; reduced motion disables both. Touch-device emulation confirms a static name. Hero, About portrait, and mobile layouts visually reviewed.
- Scroll continuity: the Kavanah section uses relative positioning and content height; its position and the following projects advance by the actual scroll distance.
- Motion checks: wheel scrolling reaches its destination; screenshots visibly change position through the scroll range while the section itself moves with the page; hover preview transforms respond; all actual Kavanah screenshot assets load. Early/late desktop and mobile captures visually inspected.
- Keyboard takeover during wheel easing verified in Chrome; keyboard position remains stable afterward.
- axe WCAG 2 A/AA and 2.1 AA: zero automated violations in tested mobile light/dark states. This is an automated check, not comprehensive accessibility certification.
- Desktop hero, mobile hero, dark theme, career section, and Kavanah composition visually reviewed. Local QA captures are ignored under `tmp/qa/`.
- All three resume routes serve the exact user-supplied PDF; file hashes match the source.
- Project format checks confirm three full mobile previews, six horizontal web previews, and five logo previews; mobile dialog images use contain rather than crop. Footer illustration, navigation, and back-to-top validated.
- Original New York footer illustration, desktop/footer mobile layouts, and project previews visually reviewed.
- `npm audit`: zero known vulnerabilities.
- `git diff --check`: passes.

Local preview runs at http://localhost:3000 on `codex/portfolio-refresh`. No remote push or deployment performed. Temporary Kavanah capture server stopped after capturing its unmodified onboarding UI.

Project-browsing refinement: the five existing suites passed, then the new end-to-end suite passed after fixing a hover/scroll event race. Checks cover desktop hover previews, sequential project navigation, arrow keys, screenshot expansion, all three Kavanah screen choices, Escape/back focus, returning to the originating row, mobile inspector width, and an axe scan of the focused viewer. Hover previews, desktop/phone viewer layouts, and navigation visually reviewed. Native light/dark crossfade manually verified in Chrome with no page errors.

Supplied mobile screenshots: all nine Kavanah/ONHAND/Signify screens load and preserve their source dimensions, portrait ratios, and contain framing. Project-specific buttons and arrow-key wrapping verified at 390px; Signify featured preview and desktop/mobile ONHAND viewer visually reviewed. Production build and all nine suites passed after integration.

Three featured products: Kavanah → ONHAND → Signify order verified; Spotify Splitter remains in the index only. ONHAND and Signify transforms respond differently during ordinary scroll, their sections move by the exact scroll delta, and phone buttons open the matching screen. No horizontal overflow after responsive layout settles at 320, 390, 768, and 1440px. Desktop and mobile compositions visually reviewed, including fully legible side screens and ONHAND dashboard/caption clearance. Production build and all nine suites pass.

Shared iPhone geometry: all nine showcase frames match in width, height, and aspect ratio at 320, 390, 768, 1000, 1200, and 1440px. Bounding-box checks confirm no screen/copy intersections at scroll entry or completion. iOS source captures are retained for Signify, now presented in the shared iPhone frame. All nine suites pass before the final ONHAND island-clearance adjustment.

Ultrawide regression: reproduced the narrow text column at 2828×1348. Corrected viewport-based gutters within capped showcase wrappers. All nine suites now pass; frame/copy geometry checks include 1920, 2828, and 3440px widths, with text columns over 300px and media columns over 600px. Kavanah, ONHAND, and Signify visually reviewed at the exact 2828×1348 reported viewport. Production build and diff checks pass.

Skyline/name footer: production build passes; footer interaction suite and mobile/light-dark/reduced-motion/keyboard accessibility suite pass. Responsive image sources load the mobile asset at 317/390px and desktop asset at 1440/2828px. Full-image 1:1 and 2:1 ratios confirmed, with no page overflow. Mobile and desktop compositions visually reviewed; name spelling and letter/spire connections checked in the generated originals.

## Complete project previews — October 2, 2026

Production build passed. All 10 Playwright tests passed in Chrome, including the new coverage verifying zero logo placeholders, new preview image loading, shared device/browser frames, uncropped rendering, and dialog overflow at 1440px and 390px. Visually reviewed the framed Ocean Vacations desktop capture and Cocky Clicker mobile concept in the production preview.

Animated skyline revision: production build passes (198 kB first-load JS). Footer interaction suite, mobile/dark/reduced-motion/keyboard accessibility suite, and new spire-signature suite pass. The new suite confirms path drawing changes with scroll, finishes at the bottom, stays finished after a reduced-motion reload, and selects the mobile SVG at 317px with no overflow. Final desktop/mobile artwork visually reviewed. Generated asset loads successfully; font and raster are separate so the connection can be animated.

October 2, revision 14: replaced the separate antenna line and capital I with a continuous, font-measured tapered contour. Shared engraving material and a feathered overlap blend into the skyline. Added smoothstep scroll phases and a damped spring; reduced motion resolves immediately. Production build passes. Three targeted Playwright checks pass: skyline reveal/reduced motion/mobile fit, project formats/footer links, and mobile/theme/keyboard accessibility. Visually inspected at 1288×1011 and 390×844. Local changes only.

October 2, revision 15: portrait drawing studio. Production build passes; two targeted Playwright checks pass covering mouse drawing, real touch input, mustache, undo/clear, reset after dismissal, Escape, outside click, close button, restored focus, reduced motion, narrow mobile/landscape fit, and existing mobile/theme/keyboard behavior. Open modal axe scan reports zero violations. Visual inspection at 1288×1011, 317×704, and 704×317. Local changes only.

October 2, revision 16: compact Lower Manhattan signature, with One World Trade Center itself forming the I. New transparent background generated with the built-in tool and encoded to WebP; foreground tower uses SVG geometry and facade lines. The artwork height is reduced from 1120 to 580 SVG units and the skyline sits behind the lettering at subdued opacity. Tower base blends into the waterfront. Final production build and two targeted skyline/footer tests pass. Portrait interaction test also passed during this revision. Inspected at 2121×1011, 1288×1011, and 390×844. Local changes only. Prompt, saved asset, and architectural reference are documented in docs/downtown-signature-art.md.

October 3, revision 18: removed the tower-as-letter signature. Full name uses the site's regular typography above a separate full-width shallow skyline. Light blue and dark graphite themes remain. Production build passes; two targeted project/footer and responsive skyline tests pass, including complete name, separation, 2121px full width, maximum 380px band height, 317px fit, asset availability, and reduced motion. Visually inspected desktop and dark mobile. Local changes only. Built-in image generation provenance and prompts: docs/clean-skyline-art.md.

October 3, revision 19: replaced soft generated raster footer with native SVG architectural linework and an engraved Bodoni wordmark rendered as paths. Preserves full name above the shallow city band, both footer themes, and reduced motion. Production build passes. Two targeted project/footer and responsive skyline checks pass. Desktop and dark mobile inspected. See docs/vector-footer-design.md. Local changes only.

October 3, revision 20: photo-referenced Manhattan engraving replaces generic SVG blocks. Inspectable source photo and full generation prompt: docs/real-manhattan-art.md. Selected 2172×724 transparent asset encoded at WebP quality 100, displayed without distorted building proportions or repeated extensions. Complete tower silhouette retained; narrow river strip cropped. Production build and two targeted footer/project checks pass. Desktop 2121×1011 and dark mobile 390×844 inspected. Existing engraved wordmark, light/dark palettes, and reduced-motion behavior retained. Local changes only.

## Production release, October 4, 2026

The optimized Next.js production build passes. The complete Playwright suite passes all 12 tests in 42.6 seconds using installed Chrome, covering preserved career/project content, normal-flow animations, both themes, mobile navigation, accessibility, responsive geometry, identical iPhone frames, full screenshot inspection, footer artwork, and the hero drawing/glasses interaction with reset and focus restoration.
