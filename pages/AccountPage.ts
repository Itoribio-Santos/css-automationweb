import { BasePage } from "./BasePage";
import { ENV } from "../support/env";
import { expect } from '@playwright/test';


export class AccountPage extends BasePage {
    
    async navigateToAccountProduct() {
        await this.navigateTo(`${ENV.baseUrl}product/listAccountProducts`);
    }

    async selectAddButton() {
        await this.page.getByRole('link', { name: '+  Add' }).click();
    }

    async selectProductType(productType: string) {
        await this.page.getByText(productType).click();
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async completeInfoDebitProduct(
        accountCategory: string,
        accProdNumber: string,
        accProdName: string) {
        await this.page
            .getByLabel('Account Category', { exact: true })
            .selectOption(accountCategory);
        await this.page
            .getByLabel('Base Currency')
            .selectOption('840');
        await this.page
            .getByLabel('Default Holder Classification')
            .selectOption('1');
        await this.page
            .getByRole('textbox', { name: 'Account Product Number *' })
            .fill(accProdNumber);
        await this.page
            .getByRole('textbox', { name: 'Account Product Name *' })
            .fill(accProdName);
        await this.page
            .getByLabel('Status')
            .selectOption('1');

        await this.page
            .getByRole('textbox', { name: 'Start Date *' })
            .click();
        await this.page.getByRole('cell', { name: '«' }).click();
        await this.page.getByRole('cell', { name: '15' }).click();
        await this.page
            .getByRole('textbox', { name: 'End Date *' })
            .click();
        await this.page.getByRole('cell', { name: '»' }).click();
        await this.page.getByRole('cell', { name: '15' }).click();

        await this.page
            .getByText('Auto-Generate Account Number')
            .click();
        await this.page.getByRole('textbox', { name: 'Account Number Total Length *' }).fill('12');
        await this.page.getByRole('textbox', { name: 'IAI Length' }).fill('3');
        await this.page.getByLabel('Check Digit Type').selectOption('0');
        await this.page.getByLabel('Branch Number').selectOption('0001');
        await this.page.getByRole('button', { name: 'Save & Continue ' }).click();
    }


    async completeAccProdConfig() {
        await this.page.getByLabel('Prepaid Operating Mode').selectOption('0');
        await this.page.getByRole('button', { name: 'Save & Continue ' }).click();
    }


    async validateAccPrdCreation(accProdNumber: string) {
        await this.navigateTo(`${ENV.baseUrl}product/listAccountProducts`);
        await this.page.getByRole('searchbox', { name: 'Search:' }).fill(accProdNumber);
        await expect(
            this.page.getByRole('row', { name: new RegExp(accProdNumber) })
        ).toBeVisible();
    }
}
