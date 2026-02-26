import { BasePage } from "./BasePage";
import { ENV } from "../support/env";
import { expect } from "playwright/test";


export class CustomerPage extends BasePage {

    private nameField = 'input[name="personalInfo.firstName"]';
    private lastNameField = 'input[name="personalInfo.lastName"]';
    private createButton = '#create_customer_info';
    readonly dateOfBirthInput = this.page.locator('[id="personalInfo.dateOfBirth"]');
    readonly cifNumberHeader = this.page.locator('.cif_number_header');

    async navigateToNewCustomer() {
        await this.navigateTo(`${ENV.baseUrl}customer/createIndividualCustomer`);
    }

    async fillPersonalInformation(
        //idCategory: string,
        name: string,
        lastName: string,
        marStatus: string,
        resiStatus: string,
        gender: string
    ) {
        //await this.page.selectOption('select[name="ccs_additional_attributes_ssn_category"]', idCategory);
        await this.page.fill(this.nameField, name);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.selectOption('select[name="personalInfo.maritalStatus"]', marStatus);
        await this.page.selectOption('select[name="personalInfo.residenceStatus"]', resiStatus);
        await this.page.selectOption('select[name="personalInfo.gender"]', gender);

        await this.page.locator('[id="personalInfo.dateOfBirth"]').click();

        const datepicker = this.page.locator('.datepicker.dropdown-menu').first();

        // 1. Click mes (February 2026)
        await datepicker.locator('.datepicker-switch').nth(0).click();

        // 2. Click año (2026)
        await datepicker.locator('.datepicker-switch').nth(1).click();

        // 3. Click década (2020-2029)
        await datepicker.locator('.datepicker-switch').nth(2).click();
        await datepicker.locator('.prev').nth(2).click();
        await datepicker.locator('.prev').nth(2).click();


        await this.page.locator(`.year:has-text("2000")`).click();
        await this.page.locator(`.month:has-text("Jan")`).click();
        await this.page.locator(`.day:has-text("15")`).click();

        await this.click(this.createButton);
    }

    async fillContactInformation(
    ) {
        await this.page.locator('[id="contactInfo.phone2"]').fill('953475889');
        await this.page.locator('[id="contactInfo.addressline1A"]').fill('Elm Street 123');
        await this.page.locator('[id="contactInfo.cityA"]').fill('Callao');
        await this.page.locator('button[title="...Please Select..."]').first().click();
        await this.page.locator('li >> a[data-tokens="PER PERU"]').first().click();

        await this.click(this.createButton);
    }

    async getCifNumber(): Promise<string> {

        await expect(this.cifNumberHeader)
            .toHaveText(/\d+/, { timeout: 10000 });

        const text = await this.cifNumberHeader.textContent();
        const match = text?.match(/\d+/);

        if (!match) throw new Error('CIF no generado');

        return match[0];
    }
}