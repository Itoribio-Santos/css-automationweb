const fs = require('fs');
const path = require('path');
const reporter = require('cucumber-html-reporter');

// 🕒 Fecha y hora actual
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportsDir = path.join(__dirname, 'reports');

// 🧹 Crea la carpeta si no existe
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

const options = {
  theme: 'bootstrap',
  jsonFile: './reports/cucumber-report.json',
  output: `./reports/cucumber-report-${timestamp}.html`, // ← nombre dinámico
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "QA",
    "Browser": "Chromium",
    "Platform": "Windows 10",
  }
};

reporter.generate(options);
