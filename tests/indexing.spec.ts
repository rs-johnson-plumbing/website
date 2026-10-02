import { test, expect } from '@playwright/test';
import { isSiteIndexable } from '../src/lib/indexing';
import { siteRoutes } from '../src/lib/routes';

test('preview deployments cannot inherit production indexing', () => {
  expect(isSiteIndexable({ VERCEL_ENV: 'production' })).toBe(true);
  expect(isSiteIndexable({ VERCEL_ENV: 'preview', NEXT_PUBLIC_SITE_INDEXABLE: 'true' })).toBe(false);
  expect(isSiteIndexable({ VERCEL_ENV: 'development', NEXT_PUBLIC_SITE_INDEXABLE: 'true' })).toBe(false);
  expect(isSiteIndexable({})).toBe(false);
});

test('public routes expose canonical URLs and finished content', async ({ request }) => {
  for (const path of siteRoutes()) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['x-robots-tag'] ?? '', path).not.toContain('noindex');
    const html = await response.text();
    expect(html, path).toContain('rel="canonical"');
    expect(html, path).toContain(isSiteIndexable() ? 'name="robots" content="index, follow"' : 'name="robots" content="noindex, nofollow"');
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
    expect(visible, path).not.toMatch(/\[(?:[^\]]*(?:confirm|license|hours|What to expect)|8|10–12)\]/i);
    expect(visible, path).not.toMatch(/master plumber on every job|the same crew|same trusted crew/i);
  }
  const robots = await (await request.get('/robots.txt')).text();
  if (isSiteIndexable()) {
    expect(robots).toContain('Allow: /');
    expect(robots).not.toMatch(/^Disallow: \/$/m);
    expect(robots).toContain('Sitemap: https://gojohnsonplumbing.com/sitemap.xml');
  } else {
    expect(robots).toContain('Disallow: /');
  }
  const confirmation = await (await request.get('/booking-confirmed')).text();
  expect(confirmation).toContain('noindex');
});
