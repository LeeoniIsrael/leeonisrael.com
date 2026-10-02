# Revision: a personal engineering portfolio

The first pass overused marketing headlines, identical rounded project tiles, and a fabricated app interface. This revision uses Leeon's name, original first-person career stories, real application images, and project-specific compositions as the identity.

Palette: chalk #f4f5f4, white #ffffff, graphite #232725, slate #626b65, ink-blue #2943a3. Existing project colors belong inside their actual screenshots, not a uniform card system.
Typography: self-hosted Inter Variable for Leeon's large name and project titles; compact readable body and a plainspoken product introduction. No slogan stack, numbered decorative sections, or repeated marketing eyebrows.

Layout: [full-width interactive 3D name and engineering/product introduction] → [in-flow real Kavanah screenshots + project context] → [two editorial features, then compact expandable project archive] → [complete ten-entry career, including original stories] → [upright portrait, personal bio, engineering/product capabilities, all coursework] → [ink-blue contact/navigation footer with original etched NYC waterfront].

Motion: measured smooth-wheel scrolling (native touch/keyboard retained); title shifts gently as it leaves the viewport; Kavanah device composition opens visibly as it moves through the viewport, with no pinning or extra scroll runway; project media follows a restrained pointer tilt; career stories expand with matching height easing; project dialogs share an entry/exit cadence; navigation indicates the active section; buttons have directional arrows, press feedback and keyboard equivalents. Reduced-motion mode shows all content statically in the same page flow. No decorative 3D scene or custom cursor.

Quality check: use the original site's full content as the baseline and the new resume only to update/add facts. Never invent a product screenshot. Validate motion at multiple actual scroll positions, not only at page load.

## Product direction and production 3D restoration

The hero restores the live production site's CSS 3D name: pointer-based perspective rotation and eight shallow shifting depth shadows in neutral gray (light #b9c1ca, dark #535e6b). No external scene or activation button is needed. Touch and reduced-motion users receive a static name. The main heading remains semantic text. The hero gives it the full width; the supplied portrait now appears as a simple upright 4:5 crop in About, with no frame, caption, rotation, or parallax.

Positioning combines the current software-engineering role with an explicit move toward product management. About connects that interest to existing evidence of work with clinical users; projects emphasize product and engineering decisions. Actual role titles and original experience stories are preserved. The first-generation slogan is removed; the factual scholarship remains in education.

## Seamless scroll and type refinement

Kavanah now occupies only the height needed for its content. Its relative container travels with the page while its phone screens fan out from entry to the center of the viewport. No sticky positioning, artificial scroll distance, timer, or animation completion gate. The next projects remain directly below it. A single self-hosted Inter Variable family unifies navigation, body, and headings. The name keeps its pointer-driven 3D interaction with a shorter neutral depth treatment; the bronze accent is removed.

## Previews and footer

Previews preserve the format of actual UI: full vertical mobile screens, full horizontal website captures. Projects without current UI use a consistent thin-stroke vector logo family with blue marks and neutral rounded tiles. The footer consolidates contact and site navigation into an ink-blue composition with an original engraved New York waterfront panorama. The exact supplied resume is served by all resume links.

## Project browsing refinements

The new motion answers browsing actions rather than adding decoration. One shared desktop index preview follows the active row vertically with a fast damped spring. It preserves actual mobile/web formats, ignores touch, and remains outside the document flow. A project dialog has persistent previous/next navigation (also arrow keys), concise crossfades, and a stable close control. Actual screenshots expand into a focused viewer; Kavanah offers its three real onboarding screens with direct triggers from the scrolling composition. Escape returns to the project before closing and restores the original focus. Light/dark changes use a short native View Transition crossfade where supported, with immediate reduced-motion/fallback behavior. Existing scroll scenes remain unpinned and the established type, palette, portrait, resume, and career content remain intact.
