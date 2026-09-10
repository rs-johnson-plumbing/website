#!/usr/bin/env node
/**
 * Widens the hero stand-in onto a 1400x600 canvas so the hero can lay it
 * across the whole band and paint a scrim over it.
 *
 * The real frame sits right-aligned at its own size; the new left area is a
 * heavily blurred wash sampled from the frame's own top-left corner (house,
 * roof, sky), and the frame's left edge is feathered into it. Nothing of the
 * subject is repeated.
 *
 * Only needed while the hero is a stand-in. A real landscape photograph goes
 * straight into public/images/concept-two/ and this script can go with it.
 *
 *   node scripts/widen-hero.mjs <source.png> <destination.webp>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const [source, destination] = process.argv.slice(2);
if (!source || !destination) {
  console.error("usage: node scripts/widen-hero.mjs <source.png> <destination.webp>");
  process.exit(1);
}

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH });
const page = await browser.newPage();
const src = `data:image/png;base64,${readFileSync(source).toString("base64")}`;
const out = await page.evaluate(async (src) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const W = 1400;
  const H = 600;
  const { naturalWidth: iw, naturalHeight: ih } = img;
  const x0 = W - iw;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.save();
  ctx.filter = "blur(34px)";
  ctx.drawImage(img, 0, 0, 150, 210, -80, -60, x0 + 260, H + 120);
  ctx.restore();

  const feathered = document.createElement("canvas");
  feathered.width = iw;
  feathered.height = ih;
  const fx = feathered.getContext("2d");
  fx.drawImage(img, 0, 0);
  fx.globalCompositeOperation = "destination-in";
  const gradient = fx.createLinearGradient(0, 0, 170, 0);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,1)");
  fx.fillStyle = gradient;
  fx.fillRect(0, 0, iw, ih);
  ctx.drawImage(feathered, x0, 0);

  return canvas.toDataURL("image/webp", 0.9);
}, src);
writeFileSync(destination, Buffer.from(out.split(",")[1], "base64"));
console.log(`wrote ${destination}`);
await browser.close();
