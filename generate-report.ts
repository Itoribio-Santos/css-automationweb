import reporter from "cucumber-html-reporter";

const options = {
  theme: "bootstrap" as const,   // 👈 nota el as const
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: true
};

reporter.generate(options);
