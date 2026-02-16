import { BasePage } from "./BasePage";
import { ENV } from "../support/env";

export class UserPage extends BasePage {
  private userIdInput = "#userId";
  private branchInput = "#usr_branch";
  private phoneInput = "#phone";
  private emailInput = "#email";
  private commentsInput = "#comments";
  private passInput = "#password";
  private saveButton = 'button:has-text("Save")';
  private confirmationMessage = ".alert-success";
  private searchInput = 'input[aria-controls="datatable"]';
  private editButton = 'button.viewUser';
  private saveSecurityButton = '(//button[contains(.,"Save")])[2]';

  async navigateToUserPage() {
    await this.navigateTo(`${ENV.baseUrl}userAdmin/createUser`);
  }

  async navigateToSearchUserPage() {
    await this.navigateTo(`${ENV.baseUrl}userAdmin/searchUser`);
  }

  async createNewUser(
    userId: string,
    branch: string,
    phone: string,
    email: string,
    comments: string,
    password: string
  ) {
    await this.fill(this.userIdInput, userId);
    await this.page.selectOption(this.branchInput, { value: branch });
    await this.fill(this.phoneInput, phone);
    await this.fill(this.emailInput, email);
    await this.fill(this.commentsInput, comments);
    await this.fill(this.passInput, password);
    await this.click(this.saveButton);
  }

  async getConfirmationMessage(): Promise<string> {
    const messageElement = this.page.locator(this.confirmationMessage);
    await messageElement.waitFor({ state: "visible" });
    return (await messageElement.textContent()) || "";
  }

  async selectUserToUpdate(userId: string) {
    await this.fill(this.searchInput, userId);
    await this.click(this.editButton);
  }

  async checkSecurityGroup(secGroup: string) {
    const spanLocator = this.page.locator(
      `input[type="checkbox"][name="secGroups"][value="${secGroup}"] + span`
    );
    await spanLocator.waitFor({ state: "visible" });
    await spanLocator.click();
    await this.click(this.saveSecurityButton);
  }

}
