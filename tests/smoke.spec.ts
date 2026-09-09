import { test, expect } from "@playwright/test";
import services from "../content/services.json";
import site from "../content/site.json";

/**
 * Smoke test: every route renders, has exactly one H1, carries the business
 * phone link, and throws no console errors. Runs against the production
 * build at phone size. Add new routes to the list as pages ship.
 */
const routes = ["/", "/for-homeowners", "/for-builders", "/services", ...services.map((s) => `/services/${s.slug}`)];

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
  await expect(page.locator("h1")).toHaveText(site.notFound.heading);
});

test("message API rejects an empty post and accepts a valid one", async ({ request }) => {
  const bad = await request.post("/api/message", { data: {} });
  expect(bad.status()).toBe(400);
  const good = await request.post("/api/message", { data: { name: "Smoke", phone: "3145551212", message: "test" } });
  expect(good.status()).toBe(200);
});

test("availability API captures an address, then a phone number", async ({ request }) => {
  const bad = await request.post("/api/availability", { data: { address: "x" } });
  expect(bad.status()).toBe(400);
  const step1 = await request.post("/api/availability", { data: { address: "123 Main St, O'Fallon" } });
  expect(step1.status()).toBe(200);
  const step2 = await request.post("/api/availability", { data: { address: "123 Main St, O'Fallon", phone: "314-555-1212", category: "Repair", issue: "No Hot Water" } });
  expect(step2.status()).toBe(200);
});

test("bid API rejects a missing contractor and accepts a full request with plans", async ({ request }) => {
  const bad = await request.post("/api/bid", { multipart: { contractor: "", phone: "3145551212" } });
  expect(bad.status()).toBe(400);
  const good = await request.post("/api/bid", {
    multipart: {
      contractor: "Smoke Builders",
      projectType: "New Construction",
      phone: "314-555-1212",
      plans: { name: "plans.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 smoke") },
    },
  });
  expect(good.status()).toBe(200);
});
