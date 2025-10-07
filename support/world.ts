import { setWorldConstructor, World as CucumberWorld } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

export class World extends CucumberWorld {
  browser!: Browser;
  page!: Page;
  loginPage: any;

  async init() {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(World);
