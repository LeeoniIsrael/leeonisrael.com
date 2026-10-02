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
    .locator(".selected-pair")
    .evaluate((el) => el.getBoundingClientRect().top);
  await page.mouse.wheel(0, 500);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBe(Math.round(finish) + 500);
  const nextTopAfter = await page
    .locator(".selected-pair")
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

test("production-style name depth follows the pointer and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const name = page.locator(".name-3d");
  await expect(page.locator(".hero-name")).toHaveCSS("opacity", "1");
  await page.mouse.move(160, 150);
  await expect
    .poll(() => name.evaluate((el) => el.style.transform))
    .toContain("rotateY");
  const first = await name.evaluate((el) => ({
    transform: el.style.transform,
    shadow: el.style.textShadow,
  }));
  await page.mouse.move(1100, 260);
  await expect
    .poll(() => name.evaluate((el) => el.style.transform))
    .not.toBe(first.transform);
  await expect
    .poll(() => name.evaluate((el) => el.style.textShadow))
    .not.toBe(first.shadow);
  await expect(page.locator("#home img")).toHaveCount(0);
  await expect(page.locator("#about img")).toHaveAttribute(
    "alt",
    "Leeon Israel",
  );
  await expect(page.getByText(/first-generation everything/i)).toHaveCount(0);
  await expect(page.locator("#home")).toContainText("product management");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(name).toHaveCSS("transform", "none");
  const staticShadow = await name.evaluate(
    (el) => getComputedStyle(el).textShadow,
  );
  await page.mouse.move(200, 160);
  await expect(name).toHaveCSS("transform", "none");
  await expect(name).toHaveCSS("text-shadow", staticShadow);
});

test("project formats preserve full screens and the illustrated footer works", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.locator(".project-index [data-preview=mobile]"),
  ).toHaveCount(1);
  await expect(page.locator(".project-index [data-preview=web]")).toHaveCount(
    7,
  );
  await expect(page.locator(".project-index [data-preview=logo]")).toHaveCount(
    6,
  );
  const phone = page.locator(".project-index .preview-phone");
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
  await expect(page.locator(".footer-panorama img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".footer-panorama img")
        .evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0),
    )
    .toBe(true);
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
  await page
    .getByRole("button", { name: "Reading preferences", exact: true })
    .click();
  await expect(page.locator(".inspection-media img")).toHaveAttribute(
    "alt",
    "Kavanah reading preferences screen",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".inspection-media img")).toHaveAttribute(
    "alt",
    "Kavanah prayer tradition screen",
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
    .getByRole("button", { name: "View Kavanah welcome screen", exact: true })
    .click();
  await expect(page.locator(".project-inspection")).toBeVisible();
  await page
    .getByRole("button", { name: "Prayer tradition", exact: true })
    .click();
  await expect(page.locator(".inspection-media img")).toHaveAttribute(
    "alt",
    "Kavanah prayer tradition screen",
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
