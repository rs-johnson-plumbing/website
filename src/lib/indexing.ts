/** Index only the production deployment; preview and development stay private. */
export function isSiteIndexable(env: Record<string, string | undefined> = process.env): boolean {
  if (env.VERCEL_ENV) return env.VERCEL_ENV === "production";
  return env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
}
