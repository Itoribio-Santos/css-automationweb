import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { LoginPage, HomePage, UserPage, CardPage, CustomerPage } from '../pages';
import fs from 'fs';
import path from 'path';

export class World extends CucumberWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  homePage!: HomePage;
  userPage!: UserPage;
  applicationId!: string;
  cardPage!: CardPage;
  customerPage!: CustomerPage;
  generatedCif!: string;

  async init() {
    const storagePath = path.resolve('auth/storageState.json');
    this.browser = await chromium.launch({ headless: true });

    // Si el storageState existe, reutilízalo
    if (fs.existsSync(storagePath)) {
      this.context = await this.browser.newContext({ storageState: storagePath });
      console.log('✅ Se reutilizó el estado autenticado');
    } else {
      // Si no existe, haz login automático
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      this.loginPage = new LoginPage(this.page);

      console.log('⚙️ No existe sesión, iniciando login automático...');
      await this.loginPage.navigateToLogin();
      await this.loginPage.login();

      // Guarda la sesión para próximas ejecuciones
      await this.context.storageState({ path: storagePath });
      console.log('💾 Estado autenticado guardado correctamente');
    }

    // Inicializa una nueva página y las pages del proyecto
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.userPage = new UserPage(this.page);
    this.cardPage = new CardPage(this.page);
    this.customerPage = new CustomerPage(this.page);

    console.log('✅ World inicializado correctamente');
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async attachScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotDir = path.resolve('reports/screenshots');

    // 🔥 Asegurar carpeta
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const filePath = path.join(
      screenshotDir,
      `${name}-${timestamp}.png`
    );

    const buffer = await this.page.screenshot({
      path: filePath,
      fullPage: true
    });

    await this.attach(buffer, "image/png");

    console.log(`📸 Screenshot saved & attached: ${filePath}`);
  }

}

setWorldConstructor(World);
