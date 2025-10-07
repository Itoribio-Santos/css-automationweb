import { Before, After } from "@cucumber/cucumber";
import { World } from "../support/world";
import { chromium } from "playwright";

Before(async function (this: World) {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
});

After(async function (this: World) {
    await this.browser.close();
});
