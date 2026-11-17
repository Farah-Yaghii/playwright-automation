
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Step 1: Define the tests folder
  testDir: './tests',

  // Run before all tests
  globalSetup: './src/fixtures/globalSetup.ts',

  // Run after all tests
  globalTeardown: './src/fixtures/globalTeardown.ts',

  // Step 2: Allow tests to run in parallel
  fullyParallel: true,

  // Step 3: Prevent test.only in CI
  forbidOnly: !!process.env.CI,

  // Step 4: Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Step 5: Use one worker in CI
  workers: process.env.CI ? 1 : undefined,

  // Step 6: Generate HTML report
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  // Step 7: Shared browser settings
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  // Step 8: Configure Google Chrome and Firefox
  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],

        // Use the installed Google Chrome browser
        channel: 'chrome',

        // Use the browser window size
        viewport: null,

        // Fix deviceScaleFactor conflict
        deviceScaleFactor: undefined,

        // Launch Google Chrome maximized
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],

        // Use the browser window size
        viewport: null,

        // Fix deviceScaleFactor conflict
        deviceScaleFactor: undefined
      }
    }

  ]
});
