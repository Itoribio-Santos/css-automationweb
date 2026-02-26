import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/world";
import { expect } from "playwright/test";

Given("I navigate to the customer creation page", async function (this: World) {
    await this.customerPage.navigateToNewCustomer();
});

When(
    "I complete the form with {string}, {string}, {string}, {string}, {string}",
    async function (

        name: string,
        lastName: string,
        marStatus: string,
        resiStatus: string,
        gender: string
    ) {
        await this.customerPage.fillPersonalInformation(

            name,
            lastName,
            marStatus,
            resiStatus,
            gender
        );
    }
);

When("I complete the contact information form", async function (this: World) {
    await this.customerPage.fillContactInformation();
});

Then('I capture the CIF number', async function () {
    await expect(this.customerPage.cifNumberHeader)
        .toBeVisible();

    await expect(this.customerPage.cifNumberHeader)
        .toHaveText(/CIF NUMBER\s*:\s*\d+/);

    const cif = await this.customerPage.getCifNumber();

    this.generatedCif = cif;
    
    console.log('CIF capturado:', cif);

    await this.attachScreenshot("Customer Creation - CIF Captured");
});
