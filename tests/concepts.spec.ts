import { test, expect } from "@playwright/test";
import copy from "../content/concept-two.json";
import home from "../content/home.json";

const heading = `${copy.hero.headingFirst} ${copy.hero.headingSecond}`;

test("concept selection survives reloads, respects direct links, and follows history", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(home.hero.single.heading);
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await expect(page.locator("h1")).toHaveText(heading);
  await expect(page).toHaveURL(/concept=2/);
  await expect(page.locator("h1")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/?concept=1");
  await expect(page.locator("h1")).toHaveText(home.hero.single.heading);
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(home.hero.single.heading);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText(heading);
  expect(errors).toEqual([]);
});

test("storage disabled still permits switching and direct Concept 2 links", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  });
  await page.goto("/?concept=2");
  await expect(page.locator("h1")).toHaveText(heading);
  await page.getByRole("button", { name: "Concept 1", exact: true }).click();
  await expect(page.locator("h1")).toHaveText(home.hero.single.heading);
});

test("homeowner action opens the existing request flow and mobile menu works", async ({ page }) => {
  await page.goto("/?concept=2");
  await page.getByRole("button", { name: copy.hero.homeownerAction }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: copy.ui.openMenu }).click();
  await expect(page.getByRole("navigation", { name: copy.ui.mobileNavigation, exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: copy.ui.openMenu })).toBeFocused();
  await page.getByRole("link", { name: copy.hero.builderAction }).click();
  await expect(page).toHaveURL(/\/for-builders$/);
  await expect(page.getByRole("group", { name: copy.ui.switcherLabel })).toHaveCount(0);
  await page.locator('header a[href="/"]').first().click();
  await expect(page.locator("h1")).toHaveText(heading);
});

test("both concepts keep the switcher clear of the mobile bar and follow the current hero", async ({ page }) => {
  await page.goto("/?concept=2");
  const switcher = page.getByRole("group", { name: copy.ui.switcherLabel });
  const bar = page.locator('div[aria-hidden]').filter({ has: page.locator('[data-track="call-sticky"]') });
  for (const concept of ["2", "1", "2"]) {
    await page.getByRole("button", { name: `Concept ${concept}`, exact: true }).click();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(bar).toHaveAttribute("aria-hidden", "true");
    await page.evaluate(() => {
      const sentinel = document.querySelector("[data-sticky-sentinel]")!;
      window.scrollTo({ top: sentinel.getBoundingClientRect().bottom + window.scrollY + 100, behavior: "instant" });
    });
    await expect(bar).toHaveAttribute("aria-hidden", "false");
    const switchBounds = await switcher.boundingBox();
    const barBounds = await bar.boundingBox();
    expect(switchBounds!.y + switchBounds!.height).toBeLessThan(barBounds!.y);
  }
});

test("all six service links resolve and any target anchors exist", async ({ page, request }) => {
  await page.goto("/?concept=2");
  const services = page.getByRole("region", { name: copy.services.heading });
  for (const item of copy.services.items) {
    await expect(services.getByRole("link", { name: item.label, exact: true })).toHaveAttribute("href", item.href);
    const [path, hash] = item.href.split("#");
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    if (hash) expect(await response.text()).toContain(`id="${hash}"`);
  }
});

test("Concept 2 fits mobile, tablet, and desktop and loads the desktop photograph", async ({ page }) => {
  for (const width of [320, 390, 768, 1139, 1140, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/?concept=2");
    await expect(page.locator("h1")).toHaveText(heading);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const image = page.getByAltText(copy.hero.image.alt);
    if (width >= 1140) {
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    } else {
      await expect(image).toBeHidden();
    }
  }
});
