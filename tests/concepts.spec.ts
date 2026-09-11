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
      await expect(modal.locator(".sd-art svg[data-illustration]")).toBeVisible();
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
    await page.locator(".c2-bar").getByRole("button", { name: copy.ui.request }).click();
    await expect(page.getByRole("dialog", { name: "Request a Bid", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
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
  await expect(page.locator("#request-a-bid")).toHaveCount(0);
  await page.locator(".c2-final-bid").click();
  await expect(page.getByRole("dialog", { name: "Request a Bid", exact: true }).locator("input[name=contractor]")).toBeVisible();
  await page.keyboard.press("Escape");
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
    await expect(modal.getByRole("link", { name: "Text", exact: true })).toBeFocused();
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
    await expect(modal.locator(".sd-art svg[data-illustration]")).toBeVisible();
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

test("hybrid illustrations render in both service directories", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator(".dp-home .dp-card svg[data-illustration]")).toHaveCount(8);
  await expect(page.locator(".dp-builders .dp-card svg[data-illustration]")).toHaveCount(6);
  await expect(page.locator(".dp-card img")).toHaveCount(0);
});

test("shared bottom actions open the correct workflow on every main page", async ({ page }) => {
  for (const route of ["/", "/for-homeowners", "/for-builders", "/services", "/our-team"]) {
    await page.goto(route);
    for (const [button, title] of [["Submit Bid Request", "Request a Bid"], ["Request Service", "Request Service"]]) {
      await page.locator(".c2-final").getByRole("button", { name: button, exact: true }).click();
      await expect(page.getByRole("dialog", { name: title, exact: true })).toBeVisible();
      await expect(page.getByRole("dialog").locator(".ci-progress li")).toHaveCount(title === "Request a Bid" ? 0 : 6);
      await page.keyboard.press("Escape");
    }
  }
  await expect(page.getByRole("heading", { name: "The Crew", exact: true })).toHaveCount(0);
});

test("builder modal keeps details between steps and sends the image with the bid", async ({ page }) => {
  let payload = "";
  await page.route("**/api/bid", async route => {
    payload = route.request().postData() || "";
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/for-builders");
  await page.locator(".c2-hero").getByRole("button", { name: "Request a Bid", exact: true }).click();
  const modal = page.getByRole("dialog", { name: "Request a Bid", exact: true });
  await modal.getByLabel("Company name").fill("Example Builders");
  await modal.getByLabel("Your name").fill("Alex Taylor");
  await modal.getByLabel("Email").fill("alex@example.com");
  await modal.getByLabel("Phone").fill("3145550100");
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  await modal.getByLabel("Project location").fill("O'Fallon, MO");
  await modal.getByRole("textbox", { name: "Project details *", exact: true }).fill("New single family plumbing rough-in.");
  await modal.locator('input[type=file]').first().setInputFiles({ name: "plan.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aE1sAAAAASUVORK5CYII=", "base64") });
  await expect(modal.getByText("plan.png", { exact: true })).toBeVisible();
  await modal.getByRole("button", { name: "Back", exact: false }).click();
  await expect(modal.getByLabel("Company name")).toHaveValue("Example Builders");
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(modal.getByLabel("Project location")).toHaveValue("O'Fallon, MO");
  await modal.getByRole("button", { name: "Send Bid Request", exact: true }).click();
  await expect(modal.getByRole("heading", { name: "Request Received" })).toBeVisible();
  expect(payload).toContain("Example Builders");
  expect(payload).toContain("plan.png");
});

test("service workflow selects one category and follows up inline before contact and time", async ({ page }) => {
  let payload = "";
  let attempts = 0;
  await page.route("**/api/message", async route => {
    payload = route.request().postData() || ""; attempts++;
    await route.fulfill({ status: attempts === 1 ? 500 : 200, contentType: "application/json", body: JSON.stringify({ ok: attempts > 1 }) });
  });
  await page.goto("/");
  await page.locator(".c2-final").getByRole("button", { name: "Request Service", exact: true }).click();
  const modal = page.getByRole("dialog", { name: "Request Service", exact: true });
  await modal.getByLabel("ZIP code").fill("63368");
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  await modal.getByRole("button", { name: "Repair", exact: true }).click();
  await modal.getByRole("button", { name: "Clogged Drain", exact: true }).click();
  await modal.getByRole("button", { name: "Change Service", exact: true }).click();
  await modal.getByRole("button", { name: "Install", exact: true }).click();
  await expect(modal.getByRole("button", { name: "Repair", exact: true })).toHaveCount(0);
  await expect(modal.locator(".ci-selection")).toContainText("Install");
  await expect(modal.getByRole("heading", { name: "What would you like installed?" })).toBeVisible();
  await modal.getByRole("button", { name: "Water Heater", exact: true }).click();
  await expect(modal.locator(".ci-options")).toHaveCount(0);
  await expect(modal.getByRole("button", { name: "Change Selection", exact: true })).toBeFocused();
  await modal.getByLabel("What’s happening?").fill("Replace the old heater.");
  await modal.getByRole("button", { name: "Change Selection", exact: true }).click();
  await expect(modal.getByRole("button", { name: "Water Heater", exact: true })).toHaveAttribute("aria-pressed", "true");
  await modal.getByRole("button", { name: "Water Heater", exact: true }).click();
  await expect(modal.getByLabel("What’s happening?")).toHaveValue("Replace the old heater.");
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  await modal.locator('input[type=file]').first().setInputFiles({ name: "heater.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aE1sAAAAASUVORK5CYII=", "base64") });
  await expect(modal.getByRole("img", { name: "Preview of heater.png", exact: true })).toBeVisible();
  await expect(modal.getByRole("button", { name: "Add More Photos", exact: true })).toBeVisible();
  await modal.locator('input[capture=environment]').setInputFiles({ name: "camera.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aE1sAAAAASUVORK5CYII=", "base64") });
  await expect(modal.locator(".ci-files li")).toHaveCount(2);
  await modal.getByRole("button", { name: "Remove heater.png", exact: true }).click();
  await modal.getByRole("button", { name: "Remove camera.png", exact: true }).click();
  await expect(modal.getByRole("button", { name: "Upload Photos", exact: true })).toBeVisible();
  await modal.locator('input[capture=environment]').setInputFiles({ name: "heater.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aE1sAAAAASUVORK5CYII=", "base64") });
  await expect(modal.getByRole("button", { name: "Add More Photos", exact: true })).toBeVisible();
  await expect(modal.locator('input[capture=environment]')).toHaveAttribute("accept", "image/*");
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  for (const [label, value] of [["First name", "Alex"], ["Last name", "Taylor"], ["Email", "alex@example.com"], ["Phone", "3145550100"], ["Street address", "123 Example Lane"], ["City", "O'Fallon"]]) await modal.getByLabel(label, { exact: false }).fill(value);
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  const rail = modal.getByRole("group", { name: "Preferred day", exact: true });
  await rail.getByRole("button").first().click();
  await modal.getByRole("button", { name: "10:00 a.m. - 12:00 p.m.", exact: true }).click();
  await modal.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(modal.locator(".ci-review")).toContainText("Install — Water Heater");
  await expect(modal.locator(".ci-review").getByRole("img", { name: "Preview of heater.png", exact: true })).toBeVisible();
  await expect(modal.locator(".ci-review")).not.toContainText("Clogged Drain");
  await modal.getByRole("button", { name: "Send Service Request", exact: true }).click();
  await expect(modal.getByRole("alert")).toContainText("couldn’t send");
  await modal.getByRole("button", { name: "Send Service Request", exact: true }).click();
  await expect(modal.getByRole("heading", { name: "Request Received" })).toBeVisible();
  expect(payload).toContain("Replace the old heater.");
  expect(payload).toContain("heater.png");
  expect(payload).toContain("10:00 a.m. - 12:00 p.m.");
});

test("footer services open details without navigating away", async ({ page }) => {
  await page.goto("/our-team");
  for (const [audience, service] of [["Services for Homeowners", "Water Heaters"], ["Services for Builders", "Plans & Takeoffs"]]) {
    const trigger = page.getByRole("navigation", { name: audience }).getByRole("button", { name: service, exact: true });
    await trigger.click();
    const modal = page.getByRole("dialog");
    await expect(modal.getByRole("heading", { name: service, exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/our-team$/);
    await modal.getByRole("button", { name: "Close service details" }).click();
    await expect(trigger).toBeFocused();
  }
});

test("homeowners can open all eight services without leaving the page", async ({ page }) => {
 await page.goto("/for-homeowners");
 const cards = page.locator("#services .c2-service");
 await expect(cards).toHaveCount(8);
 for (let i = 0; i < 8; i++) {
  await cards.nth(i).click();
  await expect(page.locator(".c2-service-modal")).toBeVisible();
  await expect(page).toHaveURL(/\/for-homeowners$/);
  await page.getByRole("button", { name: "Close service details" }).click();
 }
 await expect(page.locator("#services").getByText("See All Services")).toHaveCount(0);
});

test("request forms retain entered data after outside clicks", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/services");
  for (const [action, title, field, value] of [
    ["Request Service", "Request Service", "ZIP code", "63368"],
    ["Submit Bid Request", "Request a Bid", "Company name", "Example Builders"]
  ]) {
    await page.locator(".c2-final").getByRole("button", { name: action, exact: true }).click();
    const modal = page.getByRole("dialog", { name: title, exact: true });
    await modal.getByLabel(field).fill(value);
    await page.mouse.click(2, 2);
    await expect(modal).toBeVisible();
    await expect(modal.getByLabel(field)).toHaveValue(value);
    await modal.getByRole("button", { name: title === "Request Service" ? "Close service request" : "Close bid request" }).click();
    await expect(modal).toHaveCount(0);
  }
});

test.describe("desktop pointer interactions", () => {
 test.use({ isMobile: false, hasTouch: false });
 test("service tile motion follows hover and respects reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const route of ["/", "/services", "/for-homeowners", "/for-builders"]) {
    await page.goto(route);
    const tile = page.locator(".c2-service, .dp-card-trigger").first();
    const art = tile.locator(".c2-sketch-art");
    await tile.hover();
    await expect(art).toHaveCSS("animation-name", "none");
    const detail = tile.locator("[data-motion]").first();
    await expect(detail).not.toHaveCSS("animation-name", "none");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(detail).toHaveCSS("animation-name", "none");
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
  await page.goto("/services");
  for (const card of await page.locator(".dp-card-trigger").all()) {
    await card.hover();
    await expect(card.locator(".c2-sketch-art")).toHaveCSS("animation-name", "none");
    const movingPart = card.locator("[data-motion], .c2-sketch-flow").first();
    await expect(movingPart).not.toHaveCSS("animation-name", "none");
    await page.mouse.move(0, 0);
    await expect(movingPart).toHaveCSS("animation-name", "none");
  }
  const leaks = page.getByRole("button", { name: "View details: Leaks & Repairs", exact: true });
  await leaks.hover();
  await expect(leaks.locator(".c2-sketch-flow")).toHaveCSS("animation-name", "c2-tile-water");
  await page.mouse.move(0, 0);
  await expect(leaks.locator(".c2-sketch-flow")).toHaveCSS("animation-name", "none");
});

});

for (const route of ["/", "/services", "/for-homeowners", "/for-builders"]) {
 test(`phone illustrations animate briefly on entry: ${route}`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(route);
  const tile = page.locator(".c2-service, .dp-card-trigger").first();
  const svg = tile.locator("svg[data-illustration]");
  const detail = tile.locator("[data-motion], .c2-sketch-flow").first();
  await tile.scrollIntoViewIfNeeded();
  await expect(svg).toHaveAttribute("data-mobile-active", "true");
  await expect(detail).not.toHaveCSS("animation-name", "none");
  await expect(tile.locator(".c2-sketch-art")).toHaveCSS("animation-name", "none");
  await expect(svg).not.toHaveAttribute("data-mobile-active", "true", { timeout: 5000 });
  await expect(detail).toHaveCSS("animation-name", "none");
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(tile).not.toBeInViewport();
  await tile.scrollIntoViewIfNeeded();
  await expect(svg).toHaveAttribute("data-mobile-active", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(svg).not.toHaveAttribute("data-mobile-active", "true");
  await expect(detail).toHaveCSS("animation-name", "none");
  await tile.click();
  await expect(page.locator(".c2-service-modal")).toBeVisible();
 });
}
