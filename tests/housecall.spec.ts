import { test, expect } from "@playwright/test";
import { housecallBookingUrl } from "../src/lib/service-request";

test.skip(process.env.NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER === "custom", "Housecall coverage runs in the Housecall CI build.");

// Stub only the external provider. Assert the site's handoff after native dialog cleanup.
test.beforeEach(async ({ page }) => {
  await page.route("https://online-booking.housecallpro.com/script.js?**", route => route.fulfill({
    contentType: "application/javascript",
    body: `window.HCPWidget = { openModal() {
      document.body.dataset.bookingOpen = "true";
      document.body.dataset.dialogsAtBooking = String(document.querySelectorAll("dialog[open]").length);
      document.body.dataset.positionAtBooking = document.body.style.position;
    }};`
  }));
});

for (const width of [390, 1440]) {
  test(`all service actions route to Housecall at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/for-homeowners", "/for-builders", "/services", "/our-team", "/services/water-heaters"]) {
      await page.goto(path);
      await page.waitForFunction(() => Boolean((window as Window & { HCPWidget?: unknown }).HCPWidget));
      const buttons = page.getByRole("button", { name: "Request Service", exact: true });
      for (const button of await buttons.all()) {
        if (!await button.isVisible()) continue;
        await page.evaluate(() => delete document.body.dataset.bookingOpen);
        await button.click();
        await expect(page.locator("body")).toHaveAttribute("data-booking-open", "true");
        await expect(page.locator(".ci-service-dialog")).toHaveCount(0);
      }
      if (width === 390) {
        await page.getByRole("button", { name: "Open Menu", exact: true }).click();
        await page.locator("#c2-menu").getByRole("button", { name: "Request Service", exact: true }).click();
        await expect(page.locator("#c2-menu")).toBeHidden();
        await expect(page.locator("body")).toHaveAttribute("data-booking-open", "true");
        if (path !== "/for-builders") {
          await page.evaluate(() => { delete document.body.dataset.bookingOpen; window.scrollTo(0, 1200); });
          await page.locator('[data-track="request-sticky"]').click();
          await expect(page.locator("body")).toHaveAttribute("data-booking-open", "true");
        }
      }
      // Bid remains independent of the service provider.
      await page.locator(".c2-final").getByRole("button", { name: "Submit Bid Request", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "Request a Bid", exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
    }
    for (const path of ["/", "/for-homeowners", "/services"]) {
      await page.goto(path);
      await page.waitForFunction(() => Boolean((window as Window & { HCPWidget?: unknown }).HCPWidget));
      await page.locator(".c2-service, .dp-card-trigger").first().click();
      await page.locator(".c2-service-modal").getByRole("button", { name: "Request Service", exact: true }).click();
      await expect(page.locator("body")).toHaveAttribute("data-booking-open", "true");
      await expect(page.locator("body")).toHaveAttribute("data-dialogs-at-booking", "0");
      await expect(page.locator("body")).toHaveAttribute("data-position-at-booking", "");
    }
  });
}

test("blocked widget falls back to hosted booking", async ({ page }) => {
  await page.route("https://online-booking.housecallpro.com/script.js?**", route => route.abort());
  await page.route(housecallBookingUrl, route => route.fulfill({ contentType: "text/html", body: "<h1>Booking</h1>" }));
  await page.goto("/for-homeowners");
  await page.locator(".c2-hero").getByRole("button", { name: "Request Service", exact: true }).click();
  await expect(page).toHaveURL(housecallBookingUrl);
});
