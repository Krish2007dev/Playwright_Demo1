import { defineConfig, devices } from '@playwright/test';
import type { ReporterDescription } from '@playwright/test';

const reporters: ReporterDescription[] = [
  ['list'],
  ['allure-playwright', { resultsDir: 'allure-results' }]
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 7_000
  },
  reporter: reporters,
  use: {
    baseURL: 'https://app.wingify.com',
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
