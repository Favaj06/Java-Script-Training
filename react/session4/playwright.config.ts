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

  /*
   * Difference between timeout and expect.timeout
   *
   * timeout:
   * Controls the maximum time allowed for the entire test to finish.
   * It includes all actions such as navigation, clicking, typing,
   * waiting, and assertions. If this time is exceeded, the whole
   * test fails.
   *
   * expect.timeout:
   * Controls how long Playwright waits for an assertion to pass.
   * For example, if an element appears after a few seconds,
   * Playwright keeps retrying the assertion until this timeout
   * is reached. It affects only assertions, not the whole test.
   */

  // Maximum time allowed for the entire test.
  timeout: 30_000,

  // Maximum time allowed for an assertion.
  expect: {
    timeout: 5_000,
  },

  use: {
    // Base URL used when calling page.goto('/').
    baseURL: 'http://localhost:5173',

    // Record a trace only when a failed test is retried.
    trace: 'on-first-retry',

    // Capture a screenshot only if a test fails.
    screenshot: 'only-on-failure',

    // Record a video only when a failed test is retried.
    video: 'on-first-retry',

    // Run tests in headless mode.
    headless: true,
  },

  // Browser projects.
  /*
Device presets such as ...devices['Pixel 5'] automatically configure
a browser to behave like a real device.

A device preset sets:
1. Viewport size (screen width and height)
2. User Agent (browser/device identification)
3. Device characteristics such as touch support and device scale factor

This allows the same tests to run in a realistic mobile environment
without manually configuring each setting.
*/

projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      launchOptions: {
        env: {
          MOZ_DISABLE_CONTENT_SANDBOX: '1',
        },
      },
    },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
],

  // Automatically start the Vite development server before running tests.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});

/*
Difference between timeout and expect.timeout

timeout:
Controls the maximum time allowed for the entire test to complete.
It includes all actions such as navigation, clicking, typing,
waiting, and assertions. If the test exceeds this limit, Playwright
fails the entire test.

expect.timeout:
Controls how long Playwright waits for an assertion to become true.
For example, if an element appears after a few seconds,
expect() will keep retrying until this timeout is reached.
It affects only assertions, not the whole test.
*/
