import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/world";
import fs from "fs";

Given("I am logged in", async function (this: World) {
  const storagePath = "auth/storageState.json";

  // Si ya hay storageState, asumir sesión activa
  if (fs.existsSync(storagePath)) {
    console.log("🔄 Sesión reutilizada, no se requiere login UI");
    await this.page.goto("/");
    return;
  }

  // Si no existe, ejecutar login UI y guardar estado
  console.log("🔐 Ejecutando login manual...");
  await this.loginPage.navigateToLogin();
  await this.loginPage.login();
  await this.page.waitForSelector("div.logged-user span.name");

  const context = this.page.context();
  await context.storageState({ path: storagePath });
  console.log("💾 Nuevo estado autenticado guardado");
});

Given('I am on the login page', async function (this: World) {
  await this.loginPage.navigateToLogin();
});

When('I login with valid credentials', async function (this: World) {
  await this.loginPage.login();
});

Then('I should see the home page', async function (this: World) {
  await this.homePage.assertIsLoggedIn();
});
