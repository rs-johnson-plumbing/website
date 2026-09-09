#!/usr/bin/env node
/**
 * Content checks. Runs before every build (see package.json "prebuild").
 *
 * Fails on: unparsable JSON, missing required fields, duplicate slugs,
 * ampersands, exclamation points, "same day", "24/7", and any tel: link
 * that isn't the business number.
 *
 * Prints, without failing: every remaining [bracket] placeholder, so the
 * launch checklist is always current.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../content/", import.meta.url).pathname;
const errors = [];
const brackets = [];

function load(name) {
  try {
    return JSON.parse(readFileSync(join(dir, name), "utf8"));
  } catch (e) {
    errors.push(`${name}: ${e.message}`);
    return null;
  }
}

function walk(value, path, name) {
  if (typeof value === "string") {
    const where = `${name} › ${path}`;
    if (value.includes("&") && !value.includes("&amp;")) errors.push(`${where}: ampersand in "${value.slice(0, 60)}"`);
    // Quoted reviews are the neighbor's words; the punctuation rule is for our copy.
    const isQuote = name === "reviews.json" && /\.quote$/.test(path);
    if (value.includes("!") && !isQuote) errors.push(`${where}: exclamation point in "${value.slice(0, 60)}"`);
    if (/same[- ]day/i.test(value)) errors.push(`${where}: promises "same day"`);
    if (/24\s*\/\s*7/.test(value)) errors.push(`${where}: promises "24/7"`);
    if (/tel:/.test(value) && value !== "tel:3142201827") errors.push(`${where}: phone link is not tel:3142201827`);
    const found = value.match(/\[[^\]]+\]/g);
    if (found) brackets.push(`${where}: ${found.join(" ")}`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`, name));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k, name);
  }
}

function require(obj, fields, label, name) {
  for (const f of fields) {
    if (obj[f] === undefined || obj[f] === null || obj[f] === "") errors.push(`${name}: ${label} is missing "${f}"`);
  }
}

const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
const data = Object.fromEntries(files.map((f) => [f, load(f)]));

for (const [name, value] of Object.entries(data)) if (value) walk(value, "", name);

const site = data["site.json"];
if (site) {
  require(site, ["name", "shortName", "siteUrl", "phone", "nav", "cta", "links", "trustBar", "closingCta", "footer"], "site", "site.json");
  if (site.phone?.tel !== "tel:3142201827") errors.push("site.json: phone.tel must be tel:3142201827");
  if (site.phone?.display !== "314-220-1827") errors.push("site.json: phone.display must be 314-220-1827");
}

const services = data["services.json"];
if (Array.isArray(services)) {
  const slugs = new Set();
  services.forEach((s, i) => {
    require(s, ["slug", "name", "icon", "short", "hubShort", "metaDescription", "intro", "problems", "whatToExpect", "crew", "hub"], `service #${i + 1}`, "services.json");
    if (slugs.has(s.slug)) errors.push(`services.json: duplicate slug "${s.slug}"`);
    slugs.add(s.slug);
    if (s.metaDescription && (s.metaDescription.length < 120 || s.metaDescription.length > 165)) errors.push(`services.json: "${s.slug}" metaDescription is ${s.metaDescription.length} chars; aim for 150–160`);
    if (s.hub) require(s.hub, ["heading", "anchor", "paragraph", "whatWeDo", "link"], `service "${s.slug}" hub`, "services.json");
  });
  if (services.length !== 8) errors.push(`services.json: expected 8 services, found ${services.length}`);
}

const cities = data["cities.json"];
if (cities) {
  require(cities, ["regions", "summary", "footerCities", "cityPages"], "cities", "cities.json");
  const all = (cities.regions ?? []).flatMap((r) => r.cities ?? []);
  const slugs = new Set();
  all.forEach((c) => {
    require(c, ["slug", "name", "tier"], `city "${c.name ?? "?"}"`, "cities.json");
    if (slugs.has(c.slug)) errors.push(`cities.json: duplicate slug "${c.slug}"`);
    slugs.add(c.slug);
  });
  for (const c of all.filter((c) => c.tier === 1)) if (!cities.cityPages?.[c.slug]) errors.push(`cities.json: Tier 1 city "${c.slug}" has no cityPages entry`);
  for (const slug of cities.footerCities ?? []) if (!slugs.has(slug)) errors.push(`cities.json: footerCities references unknown slug "${slug}"`);
}

const team = data["team.json"];
if (team?.members) {
  const ids = new Set(team.members.map((m) => m.id));
  team.members.forEach((m) => require(m, ["id", "name", "title", "role", "bio", "photo"], `member "${m.id}"`, "team.json"));
  if (Array.isArray(services)) for (const s of services) for (const id of s.crew ?? []) if (!ids.has(id)) errors.push(`services.json: "${s.slug}" crew references unknown member "${id}"`);
}

const reviews = data["reviews.json"];
if (reviews?.items) {
  reviews.items.forEach((r) => {
    require(r, ["id", "quote", "author", "city", "source", "audience"], `review "${r.id}"`, "reviews.json");
    if (r.audience && !["homeowner", "builder"].includes(r.audience)) errors.push(`reviews.json: "${r.id}" audience must be homeowner or builder`);
  });
}

const home = data["home.json"];
if (home?.popularServices?.slugs && Array.isArray(services)) {
  const slugs = new Set(services.map((s) => s.slug));
  for (const slug of home.popularServices.slugs) if (!slugs.has(slug)) errors.push(`home.json: popularServices references unknown service "${slug}"`);
}
if (home?.neighbors && reviews?.items) {
  const ids = new Set(reviews.items.map((r) => r.id));
  for (const [aud, block] of Object.entries(home.neighbors)) {
    for (const id of block?.reviewIds ?? []) if (!ids.has(id)) errors.push(`home.json: neighbors.${aud} references unknown review "${id}"`);
  }
}

if (brackets.length) {
  console.log(`\nStill bracketed (${brackets.length}), waiting on confirmed facts:`);
  for (const b of brackets) console.log(`  - ${b}`);
}

if (errors.length) {
  console.error(`\nContent check failed (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log(`\nContent check passed: ${files.length} files.`);
