import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 👉 Navegar a una URL (puede usarse desde cualquier página)
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  // 👉 Obtener el título de la página
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  // 👉 Esperar que un elemento sea visible
  async waitForVisible(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  // 👉 Hacer clic en un elemento
  async click(selector: string) {
    await this.page.click(selector);
  }

  // 👉 Rellenar un campo de texto
  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  // 👉 Validar que una URL contenga cierto texto
  async expectUrlToContain(partialUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  //para que un localizador tenga un texto específico
  async assertText(locator: Locator, expectedText: string) {
    await expect(locator).toHaveText(expectedText);
  }
}
