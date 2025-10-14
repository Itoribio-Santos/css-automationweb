import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/world";

Given('I am on the login page', async function (this: World) {
  await this.loginPage.navigateToLogin();
});

When('I login with valid credentials', async function (this: World) {
  await this.loginPage.login();
});

Then('I should see the home page', async function (this: World) {
  await this.homePage.assertIsLoggedIn();
});
