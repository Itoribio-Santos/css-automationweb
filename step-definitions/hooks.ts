import { Before, After, setDefaultTimeout, AfterStep, Status } from "@cucumber/cucumber";
import { World } from "../support/world";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

setDefaultTimeout(60 * 1000);

Before(async function (this: World) {
  await this.init();
});

After(async function (this: World) {
  await this.close();
});

AfterStep(async function (this: World, step) {
  // Solo capturar si el paso falló
  if (step.result?.status === Status.FAILED) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotDir = path.join(__dirname, "../reports/screenshots");

    // Crear carpeta si no existe
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const filePath = path.join(screenshotDir, `FAILED-${timestamp}.png`);

    // Tomar captura
    const buffer = await this.page.screenshot({ path: filePath, fullPage: true });

    // Adjuntar imagen al reporte JSON
    await this.attach(buffer, "image/png");

    console.log(`❌ Screenshot captured and attached: ${filePath}`);
  }
});
