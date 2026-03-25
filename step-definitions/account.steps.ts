import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/world";


//Create Application Steps
Given("I navigate to Account Products page", async function (this: World) {
    await this.accountPage.navigateToAccountProduct();
});

When("I click the Add button to create a new account product", async function (this: World) {
    await this.accountPage.selectAddButton();
});

When("I choose {string} on the product type selection popup", async function (this: World, productType: string) {
    await this.accountPage.selectProductType(productType);
});

When('I complete the Account Product Definition form with {string}, {string}, {string}', async function (this: World, accountCategory: string, accProdNumber: string, accProdName: string) {
    await this.accountPage.completeInfoDebitProduct(accountCategory, accProdNumber, accProdName);
});

When('I complete the Account Product Configuration form', async function (this: World) {
    await this.accountPage.completeAccProdConfig();
});

Then('I validate that the account product {string} should be created successfully', async function (this: World, accProdNumber: string) {
    await this.accountPage.validateAccPrdCreation(accProdNumber);
    await this.attachScreenshot("Account Creation Successfully");
});