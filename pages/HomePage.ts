import { BasePage } from './BasePage';
import { ENV } from '../support/env';

export class HomePage extends BasePage {
  private userNameLabel = this.page.locator('div.logged-user span.name');

  async assertIsLoggedIn() {
    await this.assertText(this.userNameLabel, "Juan");
  }

}
