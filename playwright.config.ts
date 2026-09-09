import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3200",
    ...devices["Pixel 5"],
    // Local machines with a preinstalled Chromium can point at it; CI installs
    // the matching browser with `npx playwright install chromium`.
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  webServer: {
    command: "npx next start -p 3200",
    url: "http://localhost:3200",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
