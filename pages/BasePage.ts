import { Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {}

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }
}
