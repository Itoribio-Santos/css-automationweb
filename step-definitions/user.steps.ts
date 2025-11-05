import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { World } from "../support/world";

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

Then(
    "I should see the confirmation message {string}",
    async function (this: World, expectedMessage: string) {
        const message = await this.userPage.getConfirmationMessage();
        await expect(message).toContain(expectedMessage);
    }
);
