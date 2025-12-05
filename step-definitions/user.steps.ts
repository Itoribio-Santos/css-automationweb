import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { World } from "../support/world";

//Create User Steps
Given("I navigate to the user creation page", async function (this: World) {
    await this.userPage.navigateToUserPage();
});

When(
    "I create a new user with {string}, {string}, {string}, {string}, {string}, {string}",
    async function (
        this: World,
        userId: string,
        branch: string,
        phone: string,
        email: string,
        comments: string,
        password: string
    ) {
        await this.userPage.createNewUser(
            userId,
            branch,
            phone,
            email,
            comments,
            password
        );
    }
);

//Update User Steps
Given("I navigate to the search user page", async function (this: World) {
    await this.userPage.navigateToSearchUserPage();
});

Given("I select the user with {string} to update", async function (this: World, userId: string) {
    await this.userPage.selectUserToUpdate(userId);
}); 

When('I check the security group {string}', async function (secGroup) {
    await this.userPage.checkSecurityGroup(secGroup);
});

//Create & Update User Steps
Then(
    "I should see the confirmation message {string}",
    async function (this: World, expectedMessage: string) {
        const message = await this.userPage.getConfirmationMessage();
        await expect(message).toContain(expectedMessage);
    }
);
