import { test, expect } from '@playwright/test';
import copy from '../content/concept-two.json';

for (const city of copy.serviceAreas.pages) {
  test(`${city.name}: local content, metadata and schema agree`, async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/service-areas/${city.slug}`);
      await expect(page).toHaveTitle(city.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://gojohnsonplumbing.com/service-areas/${city.slug}`);
      await expect(page.getByRole('heading', { name: city.localHeading })).toBeVisible();
      await expect(page.getByRole('link', { name: city.resource.label })).toHaveAttribute('href', city.resource.href);
      for (const service of copy.serviceAreas.services) await expect(page.locator(`main a[href="/services/${service.slug}"]`)).toBeVisible();
      const data = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent || '{}')));
      const faq = data.find(item => item['@type'] === 'FAQPage');
      expect(faq.mainEntity.map((item: { name: string }) => item.name)).toEqual(city.faqs.map(item => item.q));
      const service = data.find(item => item['@type'] === 'Service');
      expect(service.provider['@id']).toBe('https://gojohnsonplumbing.com/#business');
      expect(service.provider.address).toBeUndefined();
      for (const item of city.faqs) {
        const detail = page.locator('details').filter({ has: page.getByText(item.q, { exact: true }) });
        await detail.locator('summary').click();
        await expect(detail.locator('p')).toHaveText(item.a);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (city.slug === 'ofallon') {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: `/tmp/p3-ofallon-${width}.png`, fullPage: true });
      }
    }
  });
}

test('hub and all city pages remain discoverable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3200/service-areas');
  for (const city of copy.serviceAreas.pages) await expect(page.locator(`main a[href="/service-areas/${city.slug}"]`)).toBeVisible();
  await page.screenshot({ path: '/tmp/p3-hub.png', fullPage: true });
  await page.goto('http://localhost:3200/service-areas/wentzville');
  await expect(page.getByRole('heading', { name: 'Plumber in Wentzville, MO', exact: true })).toBeVisible();
  await expect(page.getByText(copy.serviceAreas.pages[1].localBody)).toBeVisible();
  const response = await page.goto('http://localhost:3200/service-areas/not-a-city');
  expect(response?.status()).toBe(404);
  await context.close();
});
