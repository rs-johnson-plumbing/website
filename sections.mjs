import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-proxy-server"] });
const p = await b.newPage({ viewport: { width: 1120, height: 900 } });
await p.goto("http://localhost:3100/?concept=2", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
const rows = await p.evaluate(() =>
  [...document.querySelectorAll("header, main > *, footer")].map((el) => {
    const r = el.getBoundingClientRect();
    return `${(el.className || el.tagName).toString().slice(0, 42).padEnd(44)} ${Math.round(r.height)}px`;
  }),
);
console.log(rows.join("\n"));
console.log("TOTAL", await p.evaluate(() => document.body.scrollHeight));
await b.close();
