import { chromium } from "@playwright/test";
import { readFileSync } from "fs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-proxy-server"] });
const p = await b.newPage({ viewport: { width: 900, height: 600 } });
const src = "data:image/png;base64," + readFileSync("/tmp/cmp/authority.png").toString("base64");
const out = await p.evaluate(async ({ src, points }) => {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  return points.map(([name, x, y]) => {
    // average an 8x8 patch to kill export noise
    const d = ctx.getImageData(x, y, 8, 8).data;
    let r = 0, g = 0, bl = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; bl += d[i + 2]; }
    const n = d.length / 4;
    const hex = (v) => Math.round(v / n).toString(16).padStart(2, "0");
    return `${name.padEnd(22)} #${hex(r)}${hex(g)}${hex(bl)}`;
  });
}, { src, points: [
  ["hero ground", 20, 300],
  ["services band", 14, 700],
  ["service card face", 60, 640],
  ["builder band navy", 40, 900],
  ["apart band", 20, 1120],
  ["remodel copy panel", 700, 1330],
  ["reviews band", 20, 1520],
  ["final cta band", 300, 1620],
  ["footer", 400, 1790],
  ["heading ink", 60, 232],
  ["secondary line ink", 100, 300],
  ["primary button", 120, 392],
]});
console.log(out.join("\n"));
await b.close();
