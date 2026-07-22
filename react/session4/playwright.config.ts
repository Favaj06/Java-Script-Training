import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run test files in parallel to reduce execution time.
  fullyParallel: true,

  // Retry failed tests. In production/CI this is usually process.env.CI ? 2 : 0.
  // For local development we keep retries disabled.
  retries: 0,

  // Number of parallel workers. Undefined lets Playwright choose automatically.
  workers: undefined,

  // Generate an HTML report after test execution.
  reporter: 'html',

  // Maximum time allowed for each test (30 seconds).
  timeout: 30000,

  use: {
    // Base URL used when calling page.goto('/').
    baseURL: 'http://localhost:5173',

    // Record a trace only when a failed test is retried.
    trace: 'on-first-retry',

    // Capture a screenshot only if a test fails.
    screenshot: 'only-on-failure',
  },

  // Browser projects.
  // Desktop Chrome provides a realistic desktop browser configuration,
  // including viewport size, user agent and device pixel ratio.
  //
  // Mobile device presets available:
  // - iPhone 14
  // - Pixel 7
  //
  // Session 1 uses only Chromium to make test execution faster.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Automatically start the Vite development server before running tests.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});