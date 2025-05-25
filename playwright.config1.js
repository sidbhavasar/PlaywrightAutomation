// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  retries : 1,
  reporter: "html",
  workers : 2,
  expect: {
    timeout: 5000
  },
  projects : [
    {
      name : "firefox",
      use: {

        browserName: "firefox",
        headless: false,
        screenshot : 'on',
        trace : 'retain-on-failure'
      }
    },
    {
      name : "Chrome",
      use: {

        browserName: "chromium",
        headless: false,
        screenshot : 'on',
        trace : 'retain-on-failure',
        ignoreHTTPSErrors:true, //ignore SSL certificate error
        video : 'retain-on-failure'
      }
    },
    {
      name : "safari",
      use: {

        browserName: "webkit",
        headless: false,
        screenshot : 'on',
        trace : 'retain-on-failure',
        ...devices['iPhone 15 Pro Max'],
        video : 'retain-on-failure'
      }
    }
  ]




});

