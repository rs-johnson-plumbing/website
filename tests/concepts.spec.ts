import { test, expect } from "@playwright/test";
import copy from "../content/concept-two.json";

// The hero heading renders as deliberate lines past the phone, with a real
// space at the break so it still reads as a sentence.
const heading = copy.home.hero.headingLines.join(" ");
const buildersHeading = copy.builders.hero.headingLines.join(" ");

test("Concept 2 stays active across legacy links, reloads and history", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => window.localStorage.setItem("rsj-homepage-concept", "1"));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(heading);
  await expect(page.locator("h1")).toHaveText(heading);
  await expect(page.getByRole("group", { name: copy.ui.switcherLabel })).toHaveCount(0);
  await expect(page.locator("h1")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/?concept=1");
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/?concept=2");
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText(heading);
  expect(errors).toEqual([]);
});

test("Concept 2 loads with storage disabled and legacy links", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  });
  await page.goto("/?concept=2");
  await expect(page.locator("h1")).toHaveText(heading);
  await page.goto("/?concept=1");
  await expect(page.locator("h1")).toHaveText(heading);
});

test("the selected design carries across routes", async ({ page }) => {
  await page.goto("/?concept=2");
  await page.getByRole("button", { name: copy.ui.openMenu }).click();
  await page.getByRole("navigation", { name: copy.ui.mobileNavigation, exact: true }).getByRole("link", { name: "Builders" }).click();
  await expect(page).toHaveURL(/\/for-builders$/);
  await expect(page.locator("h1")).toHaveText(buildersHeading);
  await expect(page.getByRole("group", { name: copy.ui.switcherLabel })).toHaveCount(0);
});

test("the request dialog opens, traps escape, and the mobile menu returns focus", async ({ page }) => {
  await page.goto("/?concept=2");
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.locator(".c2-bar").getByRole("button", { name: copy.ui.request }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  // Focus has to land inside the modal, not stay behind it.
  await expect(page.getByRole("dialog").locator("input").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const menuButton = page.getByRole("button", { name: copy.ui.openMenu });
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: copy.ui.mobileNavigation, exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
});

test("the public design has no floating concept toggle", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("group", { name: copy.ui.switcherLabel })).toHaveCount(0);
  await expect(page.locator(".c2-bar")).toBeHidden();
});

test("homepage service cards open modals and preserve the homepage", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const services = page.getByRole("region", { name: copy.home.services.heading });
    for (const item of copy.home.services.items) {
      const card = services.getByRole("button", { name: item.label, exact: true });
      await card.scrollIntoViewIfNeeded();
      const scroll = await page.evaluate(() => window.scrollY);
      await card.click();
      const modal = page.getByRole("dialog", { name: item.label, exact: true });
      await expect(modal).toBeVisible();
      await expect(page).toHaveURL(/\/$/);
      await expect(modal.locator("li").first()).toBeVisible();
      await expect.poll(() => modal.locator("img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
      await modal.getByRole("button", { name: "Close service details" }).click();
      await expect(card).toBeFocused();
      expect(Math.abs(await page.evaluate(() => window.scrollY) - scroll)).toBeLessThanOrEqual(2);
    }
    await services.getByRole("button", { name: "Water Heaters", exact: true }).click();
    await page.locator(".c2-service-modal").getByRole("button", { name: "Request Service", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(1);
    await expect(page.getByRole("dialog").locator("input").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(services.getByRole("link", { name: "See All Services" })).toHaveAttribute("href", "/services");
  }
});

test("Concept 2 fits every width and loads the hero photograph", async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1023, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/?concept=2");
    await expect(page.locator("h1")).toHaveText(heading);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    // Phones deliberately use a house background; desktop uses the clean
    // landscape photo. Verify the asset that is actually presented.
    const image = page.getByAltText(copy.photos.homeHero.alt);
    if (width < 1024) {
      await expect(image).toBeHidden();
      const media = page.locator(".c2-hero-media");
      await expect(media).toBeVisible();
      const background = await media.evaluate((el) => getComputedStyle(el).backgroundImage);
      expect(background).toMatch(/^url\(/);
      expect(await media.evaluate(async (el) => {
        const src = getComputedStyle(el).backgroundImage.slice(5, -2);
        const photo = new Image();
        photo.src = src;
        try { await photo.decode(); return photo.naturalWidth > 0; }
        catch { return false; }
      })).toBe(true);
    } else {
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      expect(await image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain("hero-desktop-authority.webp");
    }
  }
});

test("the action bar sends builders to the bid form, not the homeowner intake", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/for-builders", "/services/builders"]) {
    await page.goto(route);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(page.locator(".c2-bar").getByRole("link", { name: copy.ui.request })).toHaveAttribute("href", "/for-builders#request-a-bid");
  }
  await page.goto("/for-homeowners");
  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(page.locator(".c2-bar").getByRole("button", { name: copy.ui.request })).toBeVisible();
});

test("mobile contact bar appears after opening content and hides again at top", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/for-homeowners", "/for-builders", "/services", "/our-team", "/services/water-heaters"]) {
    await page.goto(route);
    const bar = page.locator(".c2-bar");
    await expect(bar).toBeHidden();
    await expect(bar).toHaveAttribute("inert", "");
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(bar).toBeVisible();
    await expect(bar).not.toHaveAttribute("inert", "");
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(bar).toBeHidden();
  }
});

test("inside-page hero photographs span under the copy and fade from the right", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ["/for-builders", "/for-homeowners", "/our-team"]) {
    await page.goto(`${route}?concept=2`);
    const media = await page.locator(".c2-hero-media").boundingBox();
    const hero = await page.locator(".c2-hero").boundingBox();
    expect(Math.abs(media!.x + media!.width - hero!.x - hero!.width), route).toBeLessThanOrEqual(2);
    expect(media!.x, route).toBeLessThan(hero!.x + hero!.width * .4);
    const fade = await page.locator(".c2-hero-media").evaluate(el => getComputedStyle(el, "::after").backgroundImage);
    expect(fade, route).toContain("linear-gradient");
  }
});



test("builders page keeps homeowner typography and routes bid actions correctly", async ({ page }) => {
  await page.goto("/for-builders");
  await expect(page.locator("h1")).toHaveCSS("font-weight", "800");
  await expect(page.locator("#why-builders-heading")).toBeVisible();
  await expect(page.locator(".c2-final-request")).toHaveAttribute("href", "#request-a-bid");
  await page.locator(".c2-final-request").click();
  await expect(page.locator("#request-a-bid input[name=contractor]")).toBeVisible();
  await expect(page.locator("#request-a-bid input[name=plans]")).toHaveAttribute("accept", "application/pdf,image/*");
  await page.getByText("What should I send for a bid?", { exact: true }).click();
  await expect(page.locator(".c2-faq-list details[open]")).toContainText("fixture schedule");
  for (const width of [320, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test("service modals preserve the directory, scroll and keyboard focus", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/services");
    await expect(page.locator(".dp-home .dp-card")).toHaveCount(8);
    await expect(page.locator(".dp-builders .dp-card")).toHaveCount(6);
    const trigger = page.getByRole("button", { name: "View details: Water Heaters", exact: true });
    await trigger.scrollIntoViewIfNeeded();
    const before = await trigger.boundingBox();
    const scroll = await page.evaluate(() => window.scrollY);
    await trigger.click();
    const modal = page.getByRole("dialog", { name: "Water Heaters", exact: true });
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: "What We Do" })).toBeVisible();
    await expect(modal.getByRole("heading", { name: "Common Problems" })).toBeVisible();
    await expect(modal.getByRole("link", { name: "Call", exact: true })).toHaveAttribute("href", /^tel:/);
    await expect(modal.getByRole("button", { name: "Request Service", exact: true })).toBeVisible();
    await expect(modal).not.toContainText("[confirm]");
    await expect(modal.locator(".sd-assurance")).toHaveText("We explain your options before work begins.");
    const during = await trigger.boundingBox();
    expect(Math.abs(during!.x - before!.x)).toBeLessThanOrEqual(2);
    expect(Math.abs(during!.y - before!.y)).toBeLessThanOrEqual(2);
    await expect(modal.getByRole("button", { name: "Close service details" })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(modal.getByRole("link", { name: "Call", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(modal.getByRole("button", { name: "Close service details" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(Math.abs(await page.evaluate(() => window.scrollY) - scroll)).toBeLessThanOrEqual(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test("every directory card opens its own modal and request hands off without stacked dialogs", async ({ page }) => {
  await page.goto("/services");
  const cards = page.locator(".dp-card-trigger");
  for (let i = 0; i < await cards.count(); i++) {
    const trigger = cards.nth(i);
    await trigger.click();
    const modal = page.locator(".c2-service-modal");
    await expect(modal).toBeVisible();
    await expect(modal.locator("li").first()).toBeVisible();
    await expect.poll(() => modal.locator("img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), { message: `Artwork for card ${i + 1}`, timeout: 10000 }).toBeTruthy();
    await modal.getByRole("button", { name: "Close service details" }).click();
    await expect(trigger).toBeFocused();
  }
  await cards.first().click();
  await page.locator(".c2-service-modal").getByRole("button", { name: "Request Service", exact: true }).click();
  await expect(page.locator(".c2-service-modal")).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await expect(page.getByRole("dialog").locator("input").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("position", "fixed");
});

test("detailed service artwork loads as responsive lazy images", async ({ page }) => {
  await page.goto("/services");
  const art = page.locator(".dp-home .dp-card img").first();
  await art.scrollIntoViewIfNeeded();
  await expect(art).toHaveAttribute("loading", "lazy");
  await expect.poll(() => art.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
  const builderArt = page.locator(".dp-builders .dp-card img").first();
  await builderArt.scrollIntoViewIfNeeded();
  await expect.poll(() => builderArt.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
});
