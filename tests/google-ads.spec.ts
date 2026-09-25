import { test, expect, type Page } from "@playwright/test";
import { BOOK_APPOINTMENT_SEND_TO, BOOKING_CONFIRMATION_PATH, GOOGLE_ADS_ID } from "../src/lib/google-ads";
import { housecallBookingUrl } from "../src/lib/service-request";

const production = "https://gojohnsonplumbing.com";
const confirmation = `${production}${BOOKING_CONFIRMATION_PATH}`;
const receiptKey = "johnson-plumbing:confirmed-booking";

test.setTimeout(60_000);

async function conversions(page: Page) {
  return page.evaluate(() => {
    const queue = (window as Window & { dataLayer?: ArrayLike<unknown>[] }).dataLayer || [];
    return queue.map(entry => Array.from(entry)).filter(entry => entry[0] === "event" && entry[1] === "conversion");
  });
}

test.beforeEach(async ({ page, baseURL }) => {
  // Exercise the production hostname gate against LOCAL code, never the live site.
  await page.route(/^https:\/\/(gojohnsonplumbing\.com|johnson-test\.vercel\.app)\//, async route => {
    // Photography has separate visual coverage; keep tracking tests focused
    // on scripts and events instead of proxying large image files repeatedly.
    if (route.request().resourceType() === "image") return route.abort();
    const url = new URL(route.request().url());
    const response = await route.fetch({ url: `${baseURL}${url.pathname}${url.search}` });
    try {
      await route.fulfill({ response });
    } catch (error) {
      // Next cancels speculative prefetches during client navigation. The
      // browser can finish handling that cancellation while our proxy is fetching.
      if (!(error instanceof Error && error.message.includes("Route is already handled!"))) throw error;
    }
  });
  await page.route("https://www.googletagmanager.com/**", route => route.fulfill({
    contentType: "application/javascript", body: "/* Test: leave gtag events in the queue. */",
  }));
  await page.route(/https:\/\/[^/]*(googleadservices|doubleclick|google-analytics)\./, route => route.abort());
  await page.route("https://online-booking.housecallpro.com/script.js?**", route => route.fulfill({
    contentType: "application/javascript",
    body: `
      const frame = document.createElement('iframe');
      frame.className = 'hcp-iframe';
      frame.src = ${JSON.stringify(housecallBookingUrl)};
      document.body.append(frame);
      window.HCPWidget = { openModal() { document.body.dataset.bookingOpen = 'true'; } };
      window.addEventListener('message', event => {
        if (event.data?.type === 'hcp:redirect' && event.data.url === ${JSON.stringify(confirmation)}) {
          window.location.assign(event.data.url);
        }
      });
    `,
  }));
  await page.route("https://book.housecallpro.com/**", route => route.fulfill({
    contentType: "text/html", body: '<h1>Test booking provider</h1>',
  }));
  await page.addInitScript(() => sessionStorage.setItem("robo-ryan-seen", "yes"));
});

test.afterEach(async ({ page }) => {
  // Next cancels speculative prefetches as pages close; do not wait for those
  // canceled proxy callbacks during browser teardown.
  await page.unrouteAll({ behavior: "ignoreErrors" });
});

test("tag loads once and normal visits / direct confirmation visits do not convert", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(production);
  await expect(page.locator("#google-ads-tag")).toHaveCount(1);
  await expect(page.locator("#google-ads-tag")).toHaveAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
  await page.getByRole("link", { name: "Homeowners", exact: true }).first().click();
  await expect(page).toHaveURL(`${production}/for-homeowners`);
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#google-ads-tag")).toHaveCount(1);
  expect(await conversions(page)).toEqual([]);
  await page.goto(confirmation);
  await expect(page.getByRole("heading", { name: "Thanks for choosing Johnson Plumbing." })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  expect(await conversions(page)).toEqual([]);
});

test("local and preview builds do not load the Ads tag", async ({ page, baseURL }) => {
  for (const origin of [baseURL!, "https://johnson-test.vercel.app"]) {
    await page.goto(`${origin}${BOOKING_CONFIRMATION_PATH}`);
    await expect(page.getByRole("heading", { name: "Thanks for choosing Johnson Plumbing." })).toBeVisible();
    await expect(page.locator("#google-ads-tag")).toHaveCount(0);
    expect(await conversions(page)).toEqual([]);
  }
});

test("a trusted embedded completion converts once, opening the form does not", async ({ page }) => {
  test.skip(process.env.NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER === "custom", "This build uses the custom form.");
  await page.goto(`${production}/for-homeowners`);
  await page.waitForFunction(() => Boolean((window as Window & { HCPWidget?: unknown }).HCPWidget));
  await page.locator(".c2-hero").getByRole("button", { name: "Request Service", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-booking-open", "true");
  expect(await conversions(page)).toEqual([]);

  await expect(page.frameLocator("iframe.hcp-iframe").getByRole("heading", { name: "Test booking provider" })).toBeVisible();
  const frame = page.frames().find(frame => frame.url() === housecallBookingUrl)!;
  await frame.evaluate(url => parent.postMessage({ type: "hcp:redirect", url }, "https://gojohnsonplumbing.com"), confirmation);
  await expect(page).toHaveURL(confirmation);
  await expect.poll(async () => (await conversions(page)).length).toBe(1);
  const event = (await conversions(page))[0][2] as { send_to: string; transaction_id: string };
  expect(event.send_to).toBe(BOOK_APPOINTMENT_SEND_TO);
  expect(event.transaction_id).toMatch(/^[0-9a-f-]{36}$/);
  expect(Object.keys(event).sort()).toEqual(["send_to", "transaction_id"]);
  await page.reload();
  await expect(page.locator("#google-ads-tag")).toHaveCount(1);
  expect(await conversions(page)).toEqual([]);
  await page.goto(production);
  await page.goto(confirmation);
  expect(await conversions(page)).toEqual([]);
});

test("hosted booking return converts; reload does not duplicate", async ({ page }) => {
  await page.goto(confirmation, { referer: housecallBookingUrl });
  await expect.poll(async () => (await conversions(page)).length).toBe(1);
  await page.reload();
  await expect(page.locator("#google-ads-tag")).toHaveCount(1);
  expect(await conversions(page)).toEqual([]);
});

for (const [name, origin, source] of [
  ["untrusted origin", "https://example.com", "frame"],
  ["untrusted source window", "https://book.housecallpro.com", "parent"],
] as const) {
  test(`redirect from ${name} does not convert`, async ({ page }) => {
    test.skip(process.env.NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER === "custom", "This build uses the custom form.");
    await page.goto(production);
    await expect(page.locator("iframe.hcp-iframe")).toHaveCount(1);
    await page.evaluate(({ origin, source, url }) => {
      window.dispatchEvent(new MessageEvent("message", {
        origin, source: source === "frame" ? document.querySelector<HTMLIFrameElement>("iframe.hcp-iframe")!.contentWindow : window,
        data: { type: "hcp:redirect", url },
      }));
    }, { origin, source, url: confirmation });
    await expect(page).toHaveURL(confirmation);
    await expect(page.locator("#google-ads-tag")).toHaveCount(1);
    expect(await conversions(page)).toEqual([]);
  });
}

test("bad / expired receipts and storage failure never create conversions or break the page", async ({ page }) => {
  await page.goto(production);
  for (const value of ["not json", JSON.stringify({ id: "123e4567-e89b-42d3-a456-426614174000", confirmedAt: Date.now() - 25 * 60 * 60 * 1000, sent: false })]) {
    await page.evaluate(({ key, value }) => sessionStorage.setItem(key, value), { key: receiptKey, value });
    await page.goto(confirmation);
    await expect(page.locator("#google-ads-tag")).toHaveCount(1);
    expect(await conversions(page)).toEqual([]);
  }
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } });
  });
  await page.goto(confirmation, { referer: housecallBookingUrl });
  await expect(page.getByRole("heading", { name: "Thanks for choosing Johnson Plumbing." })).toBeVisible();
  expect(await conversions(page)).toEqual([]);
});
