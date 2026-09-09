/**
 * Typed access to the content files in /content.
 *
 * Components import from here, never from the JSON files directly, so the
 * shape of the content is checked in one place.
 */
import siteJson from "../../content/site.json";
import servicesJson from "../../content/services.json";
import citiesJson from "../../content/cities.json";
import teamJson from "../../content/team.json";
import reviewsJson from "../../content/reviews.json";
import faqsJson from "../../content/faqs.json";
import projectsJson from "../../content/projects.json";
import homeJson from "../../content/home.json";
import homeownersJson from "../../content/homeowners.json";
import servicesHubJson from "../../content/services-hub.json";

export type IconName =
  | "star"
  | "shield"
  | "check-circle"
  | "phone"
  | "water-heater"
  | "drop"
  | "drain"
  | "faucet"
  | "tub"
  | "gas"
  | "pump"
  | "bolt"
  | "clock"
  | "tag"
  | "sparkle"
  | "building"
  | "check"
  | "arrow-right"
  | "menu"
  | "close"
  | "calendar"
  | "map"
  | "chevron-down";

export type NavItem = { label: string; href: string };

export type Photo = { src: string; alt: string; caption: string };

export type Service = {
  slug: string;
  name: string;
  icon: IconName;
  short: string;
  hubShort: string;
  metaDescription: string;
  intro: string;
  problems: string[];
  whatToExpect: string;
  crew: string[];
  hub: {
    heading: string;
    anchor: string;
    paragraph: string;
    whatWeDo: string[];
    callout?: { lead: string; text: string };
    photo?: Photo;
    link: string;
  };
};

export type City = { slug: string; name: string; tier: 1 | 2 };
export type Region = { name: string; cities: City[] };

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  badges?: string[];
  photo: Photo;
  featured?: boolean;
  placeholder: boolean;
};

export type Review = {
  id: string;
  quote: string;
  author: string;
  company?: string;
  city: string;
  source: string;
  audience: "homeowner" | "builder";
  date: string;
  featured: boolean;
  paraphrase?: boolean;
  placeholder?: boolean;
};

export type FaqItem = { q: string; a: string };

export type Project = {
  id: string;
  city: string;
  type: string;
  scope: string;
  photo: Photo;
  featured: boolean;
};

export const site = siteJson;
export const services = servicesJson as Service[];
export type CitiesContent = {
  regions: Region[];
  summary: string;
  footerCities: string[];
  cityPages: Record<string, { metaDescription: string; localContext: string }>;
};

export const cities = citiesJson as unknown as CitiesContent;
export type TeamContent = Omit<typeof teamJson, "members"> & { members: TeamMember[] };
export type ReviewsContent = Omit<typeof reviewsJson, "items"> & { items: Review[] };
export type ProjectsContent = Omit<typeof projectsJson, "items"> & { items: Project[] };

export const team = teamJson as unknown as TeamContent;
export const reviews = reviewsJson as unknown as ReviewsContent;
export const faqs = faqsJson;
export const home = homeJson;
export const homeowners = homeownersJson;
export const servicesHub = servicesHubJson;
export const projects = projectsJson as unknown as ProjectsContent;

export const SITE_URL = site.siteUrl;

export function allCities(): City[] {
  return cities.regions.flatMap((r) => r.cities);
}

export function tier1Cities(): City[] {
  return allCities().filter((c) => c.tier === 1);
}

export function cityBySlug(slug: string): City | undefined {
  return allCities().find((c) => c.slug === slug);
}

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function memberById(id: string): TeamMember | undefined {
  return team.members.find((m) => m.id === id);
}

export function footerCities(): City[] {
  return cities.footerCities
    .map((slug) => cityBySlug(slug))
    .filter((c): c is City => Boolean(c));
}

/** Resolve a link key from site.json (book, message, bid, nextdoor, ...). */
export function link(key: keyof typeof siteJson.links): string {
  return site.links[key];
}
