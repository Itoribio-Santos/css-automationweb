import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/world";


//Create Application Steps
Given("I navigate to the application creation page", async function (this: World) {
    await this.cardPage.navigateToNewApplication();
});

When("I choose the option {string} for the creation of the application", async function (this: World, customerType: string) {
    await this.cardPage.selectCustomerType(customerType);
});

When("I choose the option {string} for product type", async function (this: World, productType: string) {
    await this.cardPage.selectProductType(productType);
});

When("I search the customer with CIF", async function (this: World) {
    const cif = this.generatedCif;

    if (!cif) {
        throw new Error('No CIF stored in World');
    }

    await this.cardPage.searchCustomer(cif);
});

When('I select the card type {string}, {string}, {string}', async function (this: World, cpNum: string, apNum: string, curr: string) {
    await this.cardPage.selectCardType(cpNum, apNum, curr);
});

When('I validate the PreIssueCardValidation screen', async function (this: World) {
    await this.cardPage.clickSaveAndContinue();
});

When('I validate the Services screen', async function (this: World) {
    await this.cardPage.clickSaveAndContinue();
});

When('I validate the Fees screen', async function (this: World) {
    await this.cardPage.clickContinueButton();
});

When(
    "I complete the Branch and Sales screen with {string}, {string}, {string}, {string}, {string}",
    async function (
        this: World,
        accountBranch: string,
        reportingBranch: string,
        deliveryBranch: string,
        salesAgency: string,
        salesPerson: string
    ) {
        await this.cardPage.fillBranchAndSales(
            accountBranch,
            reportingBranch,
            deliveryBranch,
            salesAgency,
            salesPerson
        );
    }
);

When('I go to the Review and Submit screen', async function (this: World) {
    await this.cardPage.goToReviewAndSubmit();
});

When('I complete the application', async function (this: World) {
    await this.cardPage.completeApplication();
});

Then("I store the application id from the results table", async function (this: World) {
    this.applicationId = await this.cardPage.getApplicationId();
    console.log('🆔 Application ID stored:', this.applicationId);
    await this.attachScreenshot("app-complete");
});

Then("I navigate to the approve card application page", async function (this: World) {
    await this.cardPage.navigateToApproveCardApplication();
});

Then('I start the card application approve flow with the stored application id', async function () {
    if (!this.applicationId) {
        throw new Error('❌ Application ID no está definido en el World');
    }
    await this.cardPage.searchApplicationById(this.applicationId);
});

Then('I approve the card application on Level 2', async function (this: World) {
    await this.cardPage.approvalLevel2();
    await this.attachScreenshot("Level2-complete");
});

Then('I approve the card application on Level 3', async function (this: World) {
    await this.cardPage.approvalLevel3();
    await this.attachScreenshot("Level3-complete");
});