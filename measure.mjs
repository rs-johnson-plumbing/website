import { chromium } from "@playwright/test";
import { readFileSync } from "fs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-proxy-server"] });

// render my page at the authority's native width so heights are comparable
const page = await b.newPage({ viewport: { width: 1120, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3100/?concept=2", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.evaluate(() => document.querySelectorAll("[role=group][aria-label]").forEach((n) => n.remove()));
await page.screenshot({ path: "/tmp/cmp/mine-1120.png", fullPage: true });
await page.close();

const scan = async (dataUrl, label) => {
  const p = await b.newPage({ viewport: { width: 900, height: 600 } });
  const runs = await p.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const col = 12; // left gutter, clear of content
    const out = [];
    let prev = null, start = 0;
    for (let y = 0; y < img.height; y++) {
      const d = ctx.getImageData(col, y, 1, 1).data;
      // the authority is an exported render, so quantise away its noise
      const q = [d[0], d[1], d[2]].map((v) => Math.round(v / 10) * 10);
      const hex = "#" + q.map((v) => Math.min(255, v).toString(16).padStart(2, "0")).join("");
      if (hex !== prev) {
        if (prev !== null && y - start > 6) out.push({ color: prev, from: start, height: y - start });
        prev = hex; start = y;
      }
    }
    if (prev !== null) out.push({ color: prev, from: start, height: img.height - start });
    return { runs: out, h: img.height };
  }, dataUrl);
  await p.close();
  console.log(`\n=== ${label} (total ${runs.h}px) ===`);
  const k = label.includes("AUTHORITY") ? 1120 / 851 : 1;
  runs.runs.filter((r) => r.height > 15).forEach((r) => console.log(String(Math.round(r.from * k)).padStart(5), r.color, `${Math.round(r.height * k)}px`));
};

await scan("data:image/png;base64," + readFileSync("/tmp/cmp/authority.png").toString("base64"), "AUTHORITY 851px wide");
await scan("data:image/png;base64," + readFileSync("/tmp/cmp/mine-1120.png").toString("base64"), "MINE at 1120px wide");
await b.close();
