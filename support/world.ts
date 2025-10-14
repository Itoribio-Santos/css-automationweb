import { setWorldConstructor, World as CucumberWorld } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

export class World extends CucumberWorld {
  browser!: Browser;
  page!: Page;
  loginPage!: LoginPage;
  homePage!: HomePage;

  async init() {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();

    // Instancia tus páginas
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);

    // 🔍 Logs de depuración
    console.log("✅ World initialized");
    console.log("Page created?", !!this.page);
    console.log("LoginPage created?", !!this.loginPage);
    console.log("HomePage created?", !!this.homePage);
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(World);
