import { test, expect } from '@playwright/test';

for (const slug of ['water-heaters', 'leaks-and-repairs', 'toilets-and-faucets']) {
  test(`${slug}: searchable content and matching FAQs on mobile and desktop`, async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/services/${slug}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByRole('heading', { name: 'Serving Homeowners Across the Area' })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://gojohnsonplumbing.com/services/${slug}`);
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent || '{}')));
      const faq = schemas.filter(schema => schema['@type'] === 'FAQPage');
      expect(faq).toHaveLength(1);
      expect(faq[0].mainEntity).toHaveLength(4);
      for (const item of faq[0].mainEntity) {
        const disclosure = page.locator('details').filter({ has: page.getByText(item.name, { exact: true }) });
        await disclosure.locator('summary').click();
        await expect(disclosure.locator('p')).toHaveText(item.acceptedAnswer.text);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: `/tmp/p2-${slug}-${width}.png`, fullPage: true });
    }
  });
}

test('priority service pages have crawlable directory links without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3200/services');
  for (const slug of ['water-heaters', 'leaks-and-repairs', 'toilets-and-faucets']) {
    await expect(page.locator(`.dp-home a[href="/services/${slug}"]`)).toBeVisible();
  }
  await context.close();
});
