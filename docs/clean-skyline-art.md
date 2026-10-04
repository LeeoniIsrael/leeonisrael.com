# Clean Manhattan footer, revision 18

Your complete name appears above the city in the site's regular Inter font. The separate skyline spans the whole footer, in a shallow band. The former building-letter composition has been removed. The existing blue light footer and graphite dark footer remain.

The skyline is generated using the built-in image_gen tool, with alpha preserved and WebP quality 92, at public/images/footer-manhattan-panorama.webp. The SVG viewport crops transparent sky, with a restrained responsive height rather than a tall illustration. The skyline has a quiet scroll fade; reduced motion shows it immediately. This is an architectural interpretation.

## Generation prompt

Use case: stylized-concept. Asset: transparent panoramic Manhattan skyline sketch for the full width of a website footer, no text. Wide 2:1 landscape canvas. Composition is critical: all buildings and their spires must be confined to the BOTTOM 35% of the image. Upper 65% is completely transparent empty sky, for later cropping. The skyline is distant and extremely wide, not a close view, so its visible silhouette is a shallow panoramic band. Draw recognizable contemporary Lower Manhattan from the Hudson River, with One World Trade Center slightly left of center, accurately recognizable narrow faceted tapered glass tower and long antenna, Brookfield Place with small domed roofs on the left, companion World Trade Center towers, dense Financial District buildings toward the right. The top of One World Trade Center antenna must be at 66% image height; waterfront baseline at 94%; fine river strokes to 98%. Buildings spread all the way to both side edges, no central gap, no bridge, no Empire State Building, no Chrysler Building, no Twin Towers. Beautiful refined silver-blue #d8e4f2 pencil and architectural engraving linework, natural hand-drawn fine outlines and facade grid strokes, transparent gaps and mostly open surfaces, restrained hatching. One consistent material. No opaque blue background, no heavy white fills, no logos, no lettering, no decorative frame. Truly transparent PNG.

## Composition refinement prompt

undefined

The selected refinement is exec-26ebbecc-d6c5-4ba0-9449-823fc2b74755.png. Its actual antenna tip is near y=522; the implementation crops transparent sky above y=485. ResizeObserver adjusts the viewBox width to preserve architectural proportions at every viewport, with matching reflected low waterfront flanks extending to the edges on wide screens. The visible city band is limited to 160–380px high. Original generated PNGs remain in Codex generated_images.
