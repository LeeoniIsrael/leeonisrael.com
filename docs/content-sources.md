# Content provenance

Reviewed October 2, 2026. Website copy is an editorial summary, not a claim of independent validation of resume metrics.

- Experience, education, and skills: supplied `Resume - Leeon Israel.pdf`, preserved at `public/resume/leeon-israel-original.pdf`. New UBS role, Qatalyst end date, B.S. Computer Science, and major GPA replace stale website content. All linked resume files are byte-identical copies of the user-supplied PDF (SHA256 `25cec9146dad01248cb1f949e70e0d4c43554b73d3b2182ca860ada201d1912f`).
- Kavanah: https://github.com/LeeoniIsrael/kavanah (README). Pre-release; not represented as launched or rabbinically approved.
- APEX Weather: https://github.com/LeeoniIsrael/apex-trading (README). Updated from obsolete equities trading copy; experimental paper trading, no earnings claims.
- Spotify Splitter: https://github.com/LeeoniIsrael/spotify-splitter (README).
- Cocky Clicker: https://github.com/LeeoniIsrael/cocky-clicker (README). Team credit retained.
- RentConnect: https://github.com/LeeoniIsrael/rent-connect-agent (README). Corrected mobile app description to the documented multi-agent housing prototype.
- ONHAND: user's ongoing chat “Build the ONHAND mobile app” and local Expo project. New repository was empty when reviewed; planned features explicitly labeled as goals.
- Ocean Vacations: local project README and “Add Split Cleaning report” chat. Described without customer data, private endpoints, or unsupported public-demo links.
- KiMO: supplied resume and original website research description, plus the user-supplied [ACM paper link](https://dl.acm.org/doi/epdf/10.65109/WTIF5096). Publication title, author order, Demonstration Track, conference dates, and pages verified against the [AAMAS 2026 proceedings paper](https://ifmas.csc.liv.ac.uk/Proceedings/aamas2026/pdfs/WTIF5096.pdf) and Crossref DOI metadata on October 9, 2026.
- Signify, Instagram Clone, Dorm Dish, Weather, Coin:Flipper, Calculator: existing portfolio copy, with GitHub destinations checked against the public repository list. Removed absolutes such as “zero lag.”

The complete original nine-role career was recovered from `origin/main:components/sections/Experience.tsx`, including SEO, Empowered Buildings, Bank of America, DE Shaw & Co., and HeadStart Fellowship. Original stories, skills, and reflections are preserved in `lib/experience-history.json`; resume updates add the current UBS role for ten total. All fourteen original courses and six capability domains remain accessible.

Project screen visuals were updated from the user-supplied `/Users/leeoniisrael/Desktop/app-screenshots` folder on October 2, 2026. Kavanah: `kavanah-01-home.png`, `02-siddur.png`, `03-reader.png`; ONHAND: `01-home.png`, `02-specialist-profile.png`, `03-worker-dashboard.png`; Signify: `01-translate.png`, `02-conversation.png`, `03-phrasebook.png`. All nine are encoded as WebP at their original dimensions without cropping or altering interface content. Screenshot text is evidence of the interface, not verification that demo functions or sample profiles are live. Each project has its own three-screen viewer with matching labels, keyboard navigation, and a shared iPhone frame. Image dimensions remain recorded from the originals; contain framing preserves each full screenshot within a consistent 390:844 device viewport. Kavanah's scrolling composition uses the same new screens. Its prior captured onboarding assets remain unused. Signify's earlier web screenshot remains an unused historical asset.

APEX, Ocean Vacations, KiMO, Cocky Clicker, and the current RentConnect prototype use original vector logo marks in one shared style. RentConnect’s old mobile mockup is retained as an unused original asset. Existing screenshots for other projects are retained. Portrait is the user-supplied IMG_7849.jpeg, resized and encoded as WebP without generative edits.

Older profile repositories, the site itself, and empty/undocumented repositories are not presented as additional finished products.

Footer art: original image generated using the built-in imagegen tool, saved as `public/images/footer-waterfront.webp`. Prompt: “Fine pale silver-blue copperplate architectural etching of the New York waterfront and Brooklyn Bridge toward Manhattan, deep ink-blue #183b70 background, wide panorama, clear blue top half, no text, logos, UI, watermark, orange, or beige.” The supplied footer screenshot inspired the layout and illustration treatment; its artwork was not copied.

Footer artwork update: two original illustrations generated with the built-in image_gen tool, saved as `public/images/footer-skyline-name.webp` and `public/images/footer-skyline-name-mobile.webp`. Both connect the I in Israel to the Empire State Building spire. Desktop uses one-line typography and a 2:1 panorama; mobile uses a square composition with two-line typography. The previous generated waterfront graphic was used only as a style reference and remains as an unused asset. Full generation prompts are preserved in `docs/footer-art-prompts.md`. Responsive picture sources preserve each complete artwork with contain framing.

## Project interface previews (October 2, 2026)

- APEX: existing `public/screenshots/apex-ui.png`, converted to WebP. This is the original project site capture, not a current weather trading dashboard.
- RentConnect: original home, map, and chat screenshots from `Desktop/Semesters/Spring 2026/RentConnect/BullStreetBuilders/docs`. Removed only external black margins; full 1206 × 2622 captures remain intact.
- Ocean Vacations: captured the actual local `Documents/ocean-vacations` DashboardApp and AdminIncome components in an isolated temporary Next.js preview. API responses were intercepted with fictional sample data; no production or personal records were used.
- KiMO: conceptual workflow visualization based on this portfolio's two-stage planning and agent-coordination description. Labeled as a visualization, not a shipped application screenshot. Editable source: `docs/project-previews/kimo.html`.
- Cocky Clicker: styled game concept requested by the user, using the portfolio palette and Gamecock garnet mascot. Editable source: `docs/project-previews/cocky.html`.

Desktop interfaces display screenshots without added browser frames or top bars; mobile interfaces share the existing phone frame. Index, hover, details, and inspection use the same ProjectVisual component.

## Navigation portrait

Generated a transparent ink sketch from the existing `public/images/leeon-israel.webp` headshot using the imagegen skill. Saved as `public/images/leeon-nav-sketch.png`. The navigation renders its alpha as a CSS mask using the theme foreground color, providing dark ink in light mode and light ink in dark mode while preserving the back-to-top link.

Current footer replaces the composite bridge illustrations with `public/images/footer-midtown-sketch.webp`, generated with image_gen from a Hudson-facing Midtown brief. This is an interpretive architectural sketch, not a surveyed skyline. The chosen initial output retains pencil detail; a lighter generated variant was rejected. Lettering is real self-hosted Inter rendered as live SVG, with a common silver-blue hatch/contour treatment. The spire connection and feathered letter reveal are implemented in code, not baked into the image. Full prompt and reference research are in `docs/manhattan-signature-art.md`.
