import { chromium } from 'playwright';
import { ENV } from './env';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Ir al login y autenticarse
  await page.goto(ENV.baseUrl + '/ccs-web/login/auth');
  await page.fill('#username', ENV.user);
  await page.fill('#password', ENV.password);
  await page.click('#login-button');

  // Esperar a que el home cargue y se vea el nombre del usuario
  await page.waitForSelector('div.logged-user span.name');

  // Guardar el estado autenticado
  await context.storageState({ path: 'auth/storageState.json' });
  console.log('✅ Estado autenticado guardado en auth/storageState.json');

  await browser.close();
})();
