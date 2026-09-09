import { test, expect } from "@playwright/test";
import services from "../content/services.json";

/**
 * Smoke test: every route renders, has exactly one H1, carries the business
 * phone link, and throws no console errors. Runs against the production
 * build at phone size. Add new routes to the list as pages ship.
 */
const routes = ["/", "/plumbing", ...services.map((s) => `/plumbing/${s.slug}`)];

for (const route of routes) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      // Resource failures are checked below by URL, where we can tell a
      // prefetch of a not-yet-built route from a broken asset.
      if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text());
    });
    page.on("response", (r) => {
      // TODO: drop the _rsc exemption once every nav target exists
      // (/for-builders, /service-area, /our-team, /reviews, /contact).
      if (r.status() >= 400 && !r.url().includes("_rsc=")) errors.push(`${r.status()} ${r.url()}`);
    });

    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('a[href="tel:3142201827"]').first()).toBeAttached();
    expect(errors, `console errors on ${route}`).toEqual([]);
  });
}

test("unknown route shows the branded 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("isn't here");
});

test("message API rejects an empty post and accepts a valid one", async ({ request }) => {
  const bad = await request.post("/api/message", { data: {} });
  expect(bad.status()).toBe(400);
  const good = await request.post("/api/message", { data: { name: "Smoke", phone: "3145551212", message: "test" } });
  expect(good.status()).toBe(200);
});
