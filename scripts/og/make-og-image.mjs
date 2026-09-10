#!/usr/bin/env node
/**
 * Renders the share image (Open Graph) to public/share-image.png.
 *
 * Every word on it comes from content/site.json, every color from
 * src/styles/tokens.ts; the mark is the same P-trap J as
 * src/components/ui/Logo.tsx; the font is the Figtree file
 * beside this script (SIL Open Font License), inlined so the render needs
 * no network. Re-run after changing any of them:
 *
 *   npm run og:image
 *
 * Uses the Playwright Chromium already installed for the smoke tests. Set
 * PW_CHROMIUM_PATH to point at a different Chromium binary.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = new URL("../../", import.meta.url);
const site = JSON.parse(readFileSync(new URL("content/site.json", root), "utf8"));
const template = readFileSync(new URL("scripts/og/og-image.html", root), "utf8");
const font = readFileSync(new URL("scripts/og/figtree-latin.woff2", root)).toString("base64");

// Brand colors, read out of the tokens file so the card follows a palette change.
const tokens = readFileSync(new URL("src/styles/tokens.ts", root), "utf8");
const color = (name) => {
  const m = tokens.match(new RegExp(`\\b${name}: "(#[0-9A-Fa-f]{6})"`));
  if (!m) throw new Error(`tokens.ts has no color "${name}"`);
  return m[1];
};

const html = template
  .replaceAll("{{font}}", font)
  .replaceAll("{{offwhite}}", color("offwhite"))
  .replaceAll("{{charcoal}}", color("charcoal"))
  .replaceAll("{{blue}}", color("blue"))
  .replaceAll("{{slate}}", color("slate"))
  .replaceAll("{{hairline}}", color("hairlineStrong"))
  .replaceAll("{{name}}", site.shortName.toUpperCase())
  .replaceAll("{{tagline}}", site.tagline)
  .replaceAll("{{credential}}", site.trustBar[0].label)
  .replaceAll("{{based}}", "Based in O'Fallon, MO")
  .replaceAll("{{phone}}", site.phone.display);

const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

const out = fileURLToPath(new URL("public/share-image.png", root));
writeFileSync(out, png);
console.log(`Wrote ${out} (${png.length} bytes)`);
