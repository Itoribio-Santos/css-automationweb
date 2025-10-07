import { Page } from "@playwright/test";

export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `./test-results/screenshots/${name}.png` });
}

export async function waitForSeconds(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
