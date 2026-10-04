# Vector footer, revision 19

Replaced the generated raster skyline with native SVG architectural linework in components/ui/manhattan-linework.tsx. The artwork includes a faceted One World Trade Center, Brookfield Place domed crowns, WTC companion towers, a Gothic crown, stepped Financial District forms, rear blocks, a detailed street wall, and restrained waterfront lines. This is an architectural interpretation of Lower Manhattan rather than a geographically measured elevation. Architectural reference for the WTC's triangular facets: https://www.som.com/projects/one-world-trade-center/ .

The complete name is now an engraved display wordmark. Bodoni 72 Book glyph outlines were rendered into paths, with tightened spacing and shared diagonal engraving. The only delivered asset is the rendered wordmark geometry in lib/footer-wordmark.json; no font file is distributed or loaded. Body and navigation typography remain Inter. Both wordmark and city use the footer's foreground ink, preserving light blue and dark graphite palettes.

Both artworks remain vectors at every size; there is no upscaled bitmap, repeated raster edge, or raster filter. The viewport keeps natural architectural proportions and adapts its horizontal crop, preserving the shallow 160–380px city band. The name remains above and separate from the skyline, and no building substitutes for a letter. The subtle scroll fade and reduced-motion completion remain.

Production build and two targeted footer/project tests passed. Visually inspected at 2121×1011 and 390×844, including dark mobile. The detailed street wall was refined afterward and the final build passed. Local changes only.
