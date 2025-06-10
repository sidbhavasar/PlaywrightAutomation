// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  reporter: "html",
  expect: {
    timeout: 5000
  },
  projects: [
      {
        name: 'chromium',
        use: {
          browserName: 'chromium',
          headless: false,
          launchOptions: {
              executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          }
        }
      }
    ],
  use: {

    browserName: "chromium",
    //browserName: "firefox",
    headless: false,
    //screenshot : 'only-on-failure',
    screenshot : 'on',
    //trace : 'on'
    trace : 'retain-on-failure'
  },


});

