import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all projects and the complete original career remain accessible", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  for (const [name, count] of [
    ["AI & agents", 5],
    ["Products", 6],
    ["Experiments", 3],
    ["All", 14],
  ] as const) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".project-card")).toHaveCount(count);
  }
  for (let i = 0; i < 14; i++) {
    const trigger = page.locator(".project-cover").nth(i);
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("#project-dialog-title")).not.toBeEmpty();
    await expect(
      page.getByRole("button", { name: "Close project details" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
  await expect(page.locator(".experience-item")).toHaveCount(10);
  for (const company of [
    "SEO",
    "Empowered Buildings",
    "Bank of America",
    "DE Shaw & Co.",
    "HeadStart Fellowship",
  ])
    await expect(
      page.locator(".experience-title strong").filter({ hasText: company }),
    ).toBeVisible();
  await page.getByRole("button", { name: "Read all stories" }).click();
  await expect(page.locator(".experience-body")).toHaveCount(10);
  await expect(page.getByText(/300,000\+ MongoDB documents/)).toBeVisible();
  await page.getByRole("button", { name: "Collapse all stories" }).click();
  await expect(page.locator(".experience-body")).toHaveCount(0);
  await page.getByRole("button", { name: "Coursework", exact: true }).click();
  await expect(page.locator(".coursework span")).toHaveCount(14);
  const response = await request.get("/resume/leeon-israel.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("pdf");
  await expect(page.getByText("Explore in 3D")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("Kavanah animates in normal page flow without pinning or scroll delay", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForTimeout(800);
  await page.mouse.wheel(0, 450);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(450);
  const bounds = await page.locator(".container-scroll").evaluate((el) => ({
    top: el.getBoundingClientRect().top + scrollY,
    height: el.clientHeight,
    viewport: innerHeight,
  }));
  await expect(page.locator(".scroll-feature")).toHaveCSS(
    "position",
    "relative",
  );
  expect(bounds.height).toBeLessThan(900);
  const start = Math.max(0, bounds.top - bounds.viewport * 0.95);
  const finish = bounds.top + bounds.height * 0.5 - bounds.viewport * 0.4;
  await page.evaluate((y) => scrollTo(0, y), start);
  await page.waitForTimeout(150);
  const before = await page
    .locator(".app-screen-left")
    .evaluate((el) => getComputedStyle(el).transform);
  const featureTopBefore = await page
    .locator(".scroll-feature")
    .evaluate((el) => el.getBoundingClientRect().top);
  await page.evaluate((y) => scrollTo(0, y), finish);
  await expect
    .poll(() =>
      page
        .locator(".app-screen-left")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe(before);
  const after = await page
    .locator(".app-screen-left")
    .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  expect(after).toBeLessThan(-70);
  const featureTopAfter = await page
    .locator(".scroll-feature")
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(featureTopBefore - featureTopAfter).toBeCloseTo(finish - start, 0);
  // The next projects move into view with the same wheel movement, without a pinned runway.
  const nextTop = await page
    .locator("[data-showcase=onhand]")
    .evaluate((el) => el.getBoundingClientRect().top);
  await page.mouse.wheel(0, 500);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBe(Math.round(finish) + 500);
  const nextTopAfter = await page
    .locator("[data-showcase=onhand]")
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(nextTop - nextTopAfter).toBeCloseTo(500, 0);
  await page.locator(".project-cover").first().hover();
  await expect(
    page.locator(".project-cover").first().locator(".index-thumb"),
  ).not.toHaveCSS("transform", "none");
  const images = page.locator(".app-screen img");
  for (let i = 0; i < (await images.count()); i++)
    expect(
      await images
        .nth(i)
        .evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0),
    ).toBe(true);
});

test("mobile, dark mode, reduced motion, and keyboard controls remain usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".scroll-feature")).toHaveCSS(
    "position",
    "relative",
  );
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        { message: `No overflow at ${width}px` },
      )
      .toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  for (const theme of ["dark", "light"]) {
    await page.getByRole("button", { name: `Use ${theme} theme` }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("portrait hero keeps the name, links, and mobile layout accessible", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.locator("img")).toHaveCount(1);
  await expect(page.locator("#about img")).toHaveCount(0);
  await expect(
    hero.getByRole("button", { name: "Draw on my portrait" }),
  ).toHaveCount(1);
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(
    "Leeon Israel",
  );
  await expect(hero).toContainText("product management");
  await expect(
    hero.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("href", "https://github.com/LeeoniIsrael");
  await expect(
    hero.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("href", "https://linkedin.com/in/leeoniisrael");
  expect((await request.get("/resume/leeon-israel.pdf")).status()).toBe(200);
  for (const width of [317, 390, 768, 1024, 1440, 2121]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await expect(hero.locator(".minimalist-name")).toHaveCSS("opacity", "1");
    await expect(hero.locator("img")).toBeVisible();
    const copy = await hero.locator(".minimalist-intro").boundingBox();
    const title = await hero.locator("h1").boundingBox();
    expect(copy!.x).toBeGreaterThanOrEqual(0);
    expect(copy!.x + copy!.width).toBeLessThanOrEqual(width);
    expect(title!.x).toBeGreaterThanOrEqual(0);
    expect(title!.x + title!.width).toBeLessThanOrEqual(width);
  }
  await hero.getByRole("link", { name: "More about me" }).click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#about");
  await page.locator('.site-header a[href="#home"]').click();
  await hero.getByRole("link", { name: "Explore my work" }).click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#projects");
  expect(errors).toEqual([]);
});

test("project formats preserve full screens and the illustrated footer works", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.locator(".project-index [data-preview=mobile]"),
  ).toHaveCount(5);
  await expect(page.locator(".project-index [data-preview=web]")).toHaveCount(
    9,
  );
  await expect(page.locator(".project-index [data-preview=logo]")).toHaveCount(
    0,
  );
  const phone = page.locator(".project-index .preview-phone").first();
  const ratio = await phone.evaluate((el) => el.clientHeight / el.clientWidth);
  expect(ratio).toBeGreaterThan(2);
  await page.locator(".project-cover").first().click();
  await expect(page.locator(".dialog-mobile .preview-phone img")).toHaveCSS(
    "object-fit",
    "contain",
  );
  await expect(page.locator(".dialog-mobile .preview-phone")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".signature-city")).toBeVisible();
  await expect(page.locator(".signature-sketch")).toHaveAttribute(
    "href",
    "/images/footer-manhattan-reference.webp",
  );
  await expect(
    page.getByRole("navigation", { name: "Footer navigation" }),
  ).toBeVisible();
  await page
    .locator(".footer-baseline")
    .getByRole("link", { name: "Back to top" })
    .click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(100);
});

test("project previews, screen inspection, and sequential browsing work together", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const trigger = page.locator(".project-cover").first();
  await trigger.hover();
  await expect(page.locator(".project-peek")).toBeVisible();
  await expect(page.locator(".project-peek .preview-phone")).toBeVisible();
  await trigger.click();
  await expect(page.locator(".project-peek")).not.toBeVisible();
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(page.locator("#project-dialog-title")).toHaveText(
    "APEX Weather",
  );
  await expect(page.locator(".dialog-copy h2")).toHaveText("APEX Weather");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#project-dialog-title")).toHaveText("Kavanah");
  const inspect = page.getByRole("button", {
    name: "View Kavanah screens",
    exact: true,
  });
  await inspect.click();
  await page.getByRole("button", { name: "Siddur", exact: true }).click();
  await expect(page.locator(".inspection-media img")).toHaveAttribute(
    "alt",
    "Kavanah siddur screen",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".inspection-media img")).toHaveAttribute(
    "alt",
    "Kavanah prayer reader screen",
  );
  const violations = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(violations.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(inspect).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "View Kavanah home screen", exact: true })
    .click();
  await expect(page.locator(".project-inspection")).toBeVisible();
  await page
    .getByRole("button", { name: "Prayer reader", exact: true })
    .click();
  await expect(page.locator(".inspection-media img")).toHaveAttribute(
    "alt",
    "Kavanah prayer reader screen",
  );
  expect(
    await page
      .locator("dialog")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Close project details", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("supplied mobile screens stay uncropped and switch independently for each project", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const [id, title, names, dimensions] of [
    [
      "kavanah",
      "Kavanah",
      ["Home", "Siddur", "Prayer reader"],
      [
        [1206, 2622],
        [1206, 2622],
        [1206, 2622],
      ],
    ],
    [
      "onhand",
      "ONHAND",
      ["Home", "Specialist profile", "Worker dashboard"],
      [
        [860, 2200],
        [860, 2200],
        [860, 2500],
      ],
    ],
    [
      "signify",
      "Signify",
      ["Translate", "Conversation", "Phrasebook"],
      [
        [1206, 2622],
        [1206, 2622],
        [1206, 2622],
      ],
    ],
  ] as const) {
    await page.locator(`.project-cover[data-project=${id}]`).click();
    await page
      .getByRole("button", { name: `View ${title} screens`, exact: true })
      .click();
    for (let i = 0; i < names.length; i++) {
      await page.getByRole("button", { name: names[i], exact: true }).click();
      const image = page.locator(".inspection-media img");
      await expect(image).toHaveAttribute(
        "alt",
        `${title} ${names[i].toLowerCase()} screen`,
      );
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await expect(image).toHaveCSS("object-fit", "contain");
      const [width, height] = dimensions[i];
      await expect(image).toHaveAttribute("width", String(width));
      await expect(image).toHaveAttribute("height", String(height));
      const ratio = await page
        .locator(".inspection-media .preview-phone")
        .evaluate((el) => {
          const box = el.getBoundingClientRect();
          return box.width / box.height;
        });
      expect(ratio).toBeCloseTo(390 / 844, 2);
      expect(
        await page
          .locator("dialog")
          .evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
    }
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".inspection-media img")).toHaveAttribute(
      "alt",
      `${title} ${names[0].toLowerCase()} screen`,
    );
    await page
      .getByRole("button", { name: "Close project details", exact: true })
      .click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  await expect(
    page.locator("[data-showcase=signify] .showcase-phone-center"),
  ).toBeVisible();
});

test("three featured mobile products have distinct scroll motion and direct screen access", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("[data-showcase]")).toHaveCount(3);
  expect(
    await page
      .locator("[data-showcase]")
      .evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("data-showcase")),
      ),
  ).toEqual(["kavanah", "onhand", "signify"]);
  await expect(page.locator(".selected-pair")).toHaveCount(0);
  await expect(
    page.locator(".project-cover[data-project=spotify]"),
  ).toBeVisible();
  for (const id of ["onhand", "signify"]) {
    const showcase = page.locator(`[data-showcase=${id}]`);
    const top = await showcase.evaluate(
      (el) => el.getBoundingClientRect().top + scrollY,
    );
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      top - 850,
    );
    await page.waitForTimeout(150);
    const firstTransform = await showcase
      .locator(".showcase-phone-side")
      .first()
      .evaluate((el) => getComputedStyle(el).transform);
    const before = await showcase.boundingBox();
    await page.evaluate(() =>
      window.scrollBy({ top: 350, behavior: "instant" }),
    );
    await page.waitForTimeout(150);
    const after = await showcase.boundingBox();
    expect(before!.y - after!.y).toBeCloseTo(350, 0);
    const secondTransform = await showcase
      .locator(".showcase-phone-side")
      .first()
      .evaluate((el) => getComputedStyle(el).transform);
    expect(secondTransform).not.toBe(firstTransform);
    await expect(showcase).toHaveCSS("position", "relative");
    await showcase.locator(".showcase-phone-center").click();
    await expect(page.locator(".project-inspection")).toBeVisible();
    await expect(page.locator(".inspection-media img")).toHaveAttribute(
      "alt",
      id === "onhand" ? "ONHAND home screen" : "Signify translate screen",
    );
    await page
      .getByRole("button", { name: "Close project details", exact: true })
      .click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
});

test("featured app frames match and animated screens never overlap their copy", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1000, 1200, 1440, 1920, 2828, 3440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForTimeout(200);
    const dimensions = await page
      .locator("[data-showcase] .iphone-frame")
      .evaluateAll((els) =>
        els.map((el) => ({
          width: parseFloat(getComputedStyle(el).width),
          height: parseFloat(getComputedStyle(el).height),
        })),
      );
    expect(dimensions).toHaveLength(9);
    const hardware = await page
      .locator("[data-showcase] .iphone-device")
      .evaluateAll((devices) =>
        devices.map((device) => {
          const shell = getComputedStyle(device);
          const display = getComputedStyle(
            device.querySelector(".iphone-display")!,
          );
          const island = getComputedStyle(
            device.querySelector(".iphone-island")!,
          );
          return [
            shell.width,
            shell.height,
            shell.padding,
            shell.borderRadius,
            display.borderRadius,
            island.width,
            island.height,
            island.top,
            island.left,
          ];
        }),
      );
    expect(hardware).toHaveLength(9);
    for (const device of hardware) expect(device).toEqual(hardware[0]);
    for (const size of dimensions) {
      expect(size.width).toBeCloseTo(dimensions[0].width, 1);
      expect(size.height).toBeCloseTo(dimensions[0].height, 1);
      expect(size.width / size.height).toBeCloseTo(390 / 844, 2);
    }
    for (const id of ["kavanah", "onhand", "signify"]) {
      const section = page.locator(`[data-showcase=${id}]`);
      if (width >= 1200) {
        const copy = await section.locator(".scroll-heading").boundingBox();
        expect(copy!.width, `${id} text width at ${width}px`).toBeGreaterThan(
          300,
        );
        expect(copy!.height).toBeLessThan(600);
        const media = await section
          .locator(id === "kavanah" ? ".scroll-stage" : ".showcase-stage")
          .boundingBox();
        expect(media!.width).toBeGreaterThan(600);
      }
      const bounds = await section.evaluate((el) => ({
        top: el.getBoundingClientRect().top + scrollY,
        height: el.clientHeight,
      }));
      for (const target of [
        bounds.top - 900,
        bounds.top + bounds.height * 0.5 - 400,
      ]) {
        await page.evaluate(
          (y) => scrollTo({ top: y, behavior: "instant" }),
          target,
        );
        await page.waitForTimeout(100);
        const intersects = await section.evaluate((el) => {
          const text = el
            .querySelector(".scroll-heading")!
            .getBoundingClientRect();
          return [...el.querySelectorAll(".iphone-frame")].some((phone) => {
            const frame = phone.getBoundingClientRect();
            return (
              frame.left < text.right &&
              frame.right > text.left &&
              frame.top < text.bottom &&
              frame.bottom > text.top
            );
          });
        });
        expect(intersects, `${id} at ${width}px`).toBe(false);
      }
    }
  }
  await expect(
    page.locator("[data-showcase=signify] .iphone-island"),
  ).toHaveCount(3);
});

test("every project has a framed interface and new previews open without cropping", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".project-cover [data-preview=logo]")).toHaveCount(
    0,
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [id, title, format] of [
      ["apex", "APEX Weather", "web"],
      ["ocean", "Ocean Vacations", "web"],
      ["kimo", "KiMO", "web"],
      ["cocky", "Cocky Clicker", "mobile"],
      ["rentconnect", "RentConnect", "mobile"],
    ]) {
      await page.locator(`.project-cover[data-project=${id}]`).click();
      await page
        .getByRole("button", { name: `View ${title} screens`, exact: true })
        .click();
      const preview = page.locator(
        `.inspection-media [data-preview=${format}]`,
      );
      await expect(preview).toBeVisible();
      const img = preview.locator("img");
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await expect(img).toHaveCSS("object-fit", "contain");
      if (format === "mobile") {
        await expect(preview.locator(".iphone-frame")).toBeVisible();
      } else {
        await expect(
          preview.locator(".browser-frame, .browser-chrome"),
        ).toHaveCount(0);
      }
      expect(
        await page
          .locator("dialog")
          .evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
      await page
        .getByRole("button", { name: "Close project details", exact: true })
        .click();
      await expect(page.getByRole("dialog")).not.toBeVisible();
    }
  }
});

test("footer skyline fills the width below the complete name and respects reduced motion", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 2121, height: 1011 });
  await page.goto("/");
  const art = page.locator(".skyline-signature");
  await page.evaluate(() =>
    scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    }),
  );
  const name = page.locator(".footer-signature-name");
  await expect(name).toHaveText("Leeon Israel");
  await expect(name).toHaveCSS("opacity", "1");
  const city = page.locator(".signature-city");
  const cityBounds = (await city.boundingBox())!;
  const nameBounds = (await name.boundingBox())!;
  expect(cityBounds.x).toBe(0);
  expect(cityBounds.width).toBe(2121);
  expect(cityBounds.height).toBeLessThanOrEqual(650);
  expect(nameBounds.y + nameBounds.height).toBeLessThan(cityBounds.y);
  await expect(art).toHaveCSS("position", "relative");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(name).toHaveCSS("opacity", "1");
  await page.setViewportSize({ width: 317, height: 704 });
  await expect.poll(async () => (await city.boundingBox())!.width).toBe(317);
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
});

test("portrait drawing opens from the photo, supports tools, and clears on every dismissal", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Draw on my portrait" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Make your mark." });
  const canvas = dialog.locator("canvas");
  await expect(dialog).toBeVisible();
  await expect(canvas).toHaveCSS("pointer-events", "auto");
  const countInk = () =>
    canvas.evaluate((el) => {
      const data = (el as HTMLCanvasElement)
        .getContext("2d")!
        .getImageData(0, 0, 1000, 1250).data;
      let count = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i]) count++;
      return count;
    });
  await dialog.getByRole("button", { name: "Glasses", exact: true }).click();
  const glasses = dialog.locator(".portrait-glasses-overlay");
  await expect(glasses).toHaveCount(1);
  await expect(glasses).toHaveCSS("pointer-events", "none");
  await expect(
    dialog.getByRole("button", { name: "Glasses on", exact: true }),
  ).toBeDisabled();
  await expect.poll(countInk).toBe(0);
  const rect = (await canvas.boundingBox())!;
  await page.mouse.move(rect.x + rect.width * 0.3, rect.y + rect.height * 0.3);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width * 0.6, rect.y + rect.height * 0.4, {
    steps: 12,
  });
  await page.mouse.up();
  await expect.poll(countInk).toBeGreaterThan(100);
  await dialog.getByRole("button", { name: "Clear drawing" }).click();
  await expect.poll(countInk).toBe(0);
  await expect(glasses).toHaveCount(1);
  await expect(
    dialog.getByRole("button", { name: "Glasses on", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(canvas).toHaveCSS("pointer-events", "auto");
  await expect.poll(countInk).toBe(0);
  await expect(glasses).toHaveCount(0);
  await expect(
    dialog.getByRole("button", { name: "Glasses", exact: true }),
  ).toBeEnabled();
  await page.locator(".portrait-backdrop").click({ position: { x: 5, y: 5 } });
  await expect(dialog).not.toBeVisible();
  await page.setViewportSize({ width: 317, height: 704 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await trigger.click();
  await expect(canvas).toHaveCSS("pointer-events", "auto");
  await dialog.getByRole("button", { name: "Glasses", exact: true }).click();
  await expect(glasses).toHaveCount(1);
  await expect(
    dialog.getByRole("button", { name: "Glasses on", exact: true }),
  ).toBeDisabled();
  const touch = await page.context().newCDPSession(page);
  const mobileCanvas = (await canvas.boundingBox())!;
  const x = mobileCanvas.x + mobileCanvas.width * 0.4;
  const y = mobileCanvas.y + mobileCanvas.height * 0.3;
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: x + 30, y: y + 30 }],
  });
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect.poll(countInk).toBeGreaterThan(100);
  const controls = await dialog.locator(".portrait-controls").boundingBox();
  expect(controls!.x).toBeGreaterThanOrEqual(0);
  expect(controls!.x + controls!.width).toBeLessThanOrEqual(317);
  expect(controls!.y + controls!.height).toBeLessThan(704);
  await page.setViewportSize({ width: 704, height: 317 });
  await expect
    .poll(async () => {
      const bounds = await dialog.locator(".portrait-controls").boundingBox();
      return (
        bounds!.x >= 0 &&
        bounds!.x + bounds!.width <= 704 &&
        bounds!.y >= 0 &&
        bounds!.y + bounds!.height <= 317
      );
    })
    .toBe(true);
  await dialog.getByRole("button", { name: "Close portrait" }).click();
  await expect(dialog).not.toBeVisible();
});
