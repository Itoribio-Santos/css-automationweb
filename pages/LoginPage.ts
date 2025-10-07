import { BasePage } from "./BasePage";
import { ENV } from "../support/env";

export class LoginPage extends BasePage {
  private usernameInput = "#user-name";
  private passwordInput = "#password";
  private loginButton = "#login-button";

  async navigateToLogin() {
    await this.page.goto(ENV.baseUrl);
  }

  async login() {
    await this.page.fill(this.usernameInput, ENV.user);
    await this.page.fill(this.passwordInput, ENV.password);
    await this.page.click(this.loginButton);
  }
}
