import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on'
  },
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report' }]]
});
