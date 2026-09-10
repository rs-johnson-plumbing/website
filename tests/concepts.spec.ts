import { test, expect } from "@playwright/test";
import copy from "../content/concept-two.json";
import home from "../content/home.json";

// The hero heading is rendered as deliberate lines, so textContent has no
// space where the line break is.
const heading = copy.home.hero.headingLines.join("");
const buildersHeading = copy.builders.hero.headingLines.join("");
const conceptOneHeading = home.hero.single.heading;

test("concept selection survives reloads, respects direct links, and follows history", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(conceptOneHeading);
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await expect(page.locator("h1")).toHaveText(heading);
  await expect(page).toHaveURL(/concept=2/);
  await expect(page.locator("h1")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/?concept=1");
  await expect(page.locator("h1")).toHaveText(conceptOneHeading);
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(conceptOneHeading);
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
  await expect(page.locator("h1")).toHaveText(conceptOneHeading);
});

test("the selected design carries across routes", async ({ page }) => {
  await page.goto("/?concept=2");
  await page.getByRole("button", { name: copy.ui.openMenu }).click();
  await page.getByRole("navigation", { name: copy.ui.mobileNavigation, exact: true }).getByRole("link", { name: "Builders" }).click();
  await expect(page).toHaveURL(/\/for-builders$/);
  await expect(page.locator("h1")).toHaveText(buildersHeading);
  await expect(page.getByRole("group", { name: copy.ui.switcherLabel })).toBeVisible();
});

test("the request dialog opens, traps escape, and the mobile menu returns focus", async ({ page }) => {
  await page.goto("/?concept=2");
  await page.locator(".c2-bar").getByRole("button", { name: copy.ui.request }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const menuButton = page.getByRole("button", { name: copy.ui.openMenu });
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: copy.ui.mobileNavigation, exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
});

test("the switcher stays clear of Concept 2's action bar", async ({ page }) => {
  await page.goto("/?concept=2");
  const switcher = page.getByRole("group", { name: copy.ui.switcherLabel });
  const bar = page.locator(".c2-bar");
  await expect(bar).toBeVisible();
  const switchBounds = await switcher.boundingBox();
  const barBounds = await bar.boundingBox();
  expect(switchBounds!.y + switchBounds!.height).toBeLessThanOrEqual(barBounds!.y);
});

test("every homepage service link resolves and any target anchor exists", async ({ page, request }) => {
  await page.goto("/?concept=2");
  const services = page.getByRole("region", { name: copy.home.services.heading });
  for (const item of copy.home.services.items) {
    await expect(services.getByRole("link", { name: item.label, exact: true })).toHaveAttribute("href", item.href);
    const [path, hash] = item.href.split("#");
    const response = await request.get(path);
    expect(response.status()).toBe(200);
  }
  // Anchors that only exist in Concept 2 have to be checked in Concept 2.
  for (const item of copy.home.services.items.filter((service) => service.href.includes("#"))) {
    const [path, hash] = item.href.split("#");
    await page.goto(`${path}?concept=2`);
    await expect(page.locator(`#${hash}`)).toHaveCount(1);
  }
});

test("Concept 2 fits every width and loads the desktop hero photograph", async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1023, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/?concept=2");
    await expect(page.locator("h1")).toHaveText(heading);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const image = page.getByAltText(copy.photos.homeHero.alt);
    if (width >= 1024) {
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    } else {
      await expect(image).toBeHidden();
    }
  }
});
