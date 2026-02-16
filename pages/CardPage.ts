import { BasePage } from "./BasePage";
import { ENV } from "../support/env";
import { expect } from '@playwright/test';


export class CardPage extends BasePage {
    private nextButton = '(//button[contains(.,"Next")])';
    private cifNumberInput = 'input[name="cif_number"]';
    private searchCustomerButton = '(//button[contains(.,"Search Customer")])';
    private selectButton = '#findIndividualCustomer_datatable tbody button.btn-default.btn-xs';
    private saveAndContinueButton = this.page.getByRole('button', {
        name: /save & continue/i
    });
    private continueButton = this.page.getByRole('link', {
        name: /continue/i
    });
    private goToReviewButton = this.page.getByRole('link', {
        name: /go to review & submit/i
    });
    private completeButton = '#submitButton';
    private applicationSearchInput = 'input[type="search"][aria-controls="datatable"]';

    async navigateToNewApplication() {
        await this.navigateTo(`${ENV.baseUrl}cardApplication/index`);
    }

    async navigateToApproveCardApplication() {
        await this.navigateTo(`${ENV.baseUrl}cardApplicationApproval/index`);
    }

    async selectCustomerType(customerType: string) {
        const spanLocator = this.page.locator(
            `label:has(input[value="${customerType}"])`
        );
        await spanLocator.waitFor({ state: "visible" });
        await spanLocator.click();
        await this.click(this.nextButton);
    }

    async selectProductType(productType: string) {
        const spanLocator = this.page.locator(
            `label:has(input[value="${productType}"])`
        );
        await spanLocator.waitFor({ state: "visible" });
        await spanLocator.click();
        await this.click(this.nextButton);
    }

    async searchCustomer(cifCustomer: string) {
        await this.page.selectOption('select', { value: 'cifNumber' });
        await this.page.fill(this.cifNumberInput, cifCustomer);
        await this.click(this.searchCustomerButton);
        await this.click(this.selectButton);
    }

    async selectCardType(cpNum: string, apNum: string, curr: string) {
        const card = this.page.locator(
            `a.uniqueSelect[href*="cpNum=${cpNum}"][href*="apNum=${apNum}"][href*="curr=${curr}"]`
        );
        await card.waitFor({ state: 'visible' });
        await card.click();
    }

    async clickSaveAndContinue() {
        await this.saveAndContinueButton.click();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async fillBranchAndSales(
        accBranch: string,
        repBranch: string,
        devBranch: string,
        salesAgency: string,
        salesPerson: string,
    ) {

        await this.page.waitForSelector(
            '#branchAndSalesInfo\\.accountBranch',
            { state: 'attached' }
        );

        const accountBranch = this.page.locator('#branchAndSalesInfo\\.accountBranch');

        await accountBranch.waitFor({ state: 'visible' });
        await accountBranch.selectOption(accBranch);

        await this.page.selectOption('#branchAndSalesInfo\\.reportingBranch', repBranch);
        await this.page.selectOption('#branchAndSalesInfo\\.deliveryBranch', devBranch);
        await this.page.selectOption('#salesAgency', salesAgency);
        await this.page.selectOption('#salesPerson', salesPerson);

        await this.saveAndContinueButton.click();
    }



    async goToReviewAndSubmit() {
        await this.goToReviewButton.click();
    }

    async completeApplication() {
        await this.page.click(this.completeButton);
    }

    async getApplicationId(): Promise<string> {
        const appId = await this.page
            .locator('#datatable tbody tr:first-child td:nth-child(1)')
            .innerText();
        return appId.trim();
    }

    async searchApplicationById(applicationId: string) {
        const searchInput = this.page.locator(this.applicationSearchInput);
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.fill(applicationId);
        const row = this.page.locator(
            `#datatable tbody tr:has(td:text("${applicationId}"))`
        );
        await row.waitFor({ state: 'visible' });
        const editButton = row.locator('button.btn-default.btn-xs');
        await editButton.click();
    }

    async approvalLevel2() {
        await this.page.fill('input[name="comment"]', 'Automation Approved L2');
        // Forzar blur para validar required
        await this.page.locator('input[name="comment"]').press('Tab');
        await this.page.evaluate(() => {
            const form = document.querySelector('form') as HTMLFormElement;
            if (form) {
                form.action = form.action.replace('index', 'approveL2');
                form.submit();
            }
        });
        await expect(
            this.page.getByText('APPROVED', { exact: true })
        ).toBeVisible();
    }

    async approvalLevel3() {
        await this.page.fill('input[name="comment"]', 'Automation Approved L3');
        // Forzar blur para validar required
        await this.page.locator('input[name="comment"]').press('Tab');
        await this.page.evaluate(() => {
            const form = document.querySelector('form') as HTMLFormElement;
            if (form) {
                form.action = form.action.replace('index', 'approveL3');
                form.submit();
            }
        });
        await expect(
            this.page.getByRole('cell', { name: /L3 Done.*Closed - PASSED/ })
        ).toBeVisible();
    }
}