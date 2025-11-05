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

  async navigateToUserPage() {
    await this.navigateTo(`${ENV.baseUrl}/ccs-web/userAdmin/createUser`);
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
}
