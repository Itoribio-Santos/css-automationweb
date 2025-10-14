import { BasePage } from './BasePage';
import { ENV } from '../support/env';

export class LoginPage extends BasePage {
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = 'button:has-text("Login")';

  async navigateToLogin() {
    await this.navigateTo(ENV.baseUrl + '/ccs-web/login/auth');
  }

  async login() {
    await this.fill(this.usernameInput, ENV.user);
    await this.fill(this.passwordInput, ENV.password);
    await this.click(this.loginButton);
  }
}
