CSS-AUTOMATIONWEB/
│── package.json               # Configuración de dependencias y scripts
│── tsconfig.json               # Configuración de TypeScript
│── playwright.config.ts        # Configuración de Playwright
│── cucumber.json (opcional)    # Configuración de reportes cucumber-json
│── .gitignore
│
├── features/                   # Archivos de escenarios (Gherkin)
│   ├── login.feature           # Escenarios de login
│   ├── search.feature          # Escenarios de búsqueda
│   └── ...
│
├── step-definitions/           # Glue code (steps en TS)
│   ├── login.steps.ts          # Implementación de steps de login
│   ├── search.steps.ts         # Implementación de steps de búsqueda
│   └── hooks.ts                # Hooks globales (Before, After)
│
├── pages/                      # Page Object Model (POM)
│   ├── BasePage.ts             # Clase base para reutilizar métodos comunes
│   ├── LoginPage.ts            # POM del login
│   ├── HomePage.ts             # POM de home
│   └── SearchPage.ts           # POM de búsqueda
│
├── support/                    # Configuración y utilidades
│   ├── world.ts                # Manejo de browser/page para Cucumber
│   ├── env.ts                  # Variables de entorno (URL, users, etc.)
│   └── helpers.ts              # Funciones utilitarias (esperas, screenshots)
│
├── reports/                    # Reportes HTML/JSON
│   ├── cucumber-report.html
│   └── cucumber-report.json
│
└── test-results/               # Evidencias (screenshots, traces, videos)
    ├── screenshots/
    ├── videos/
    └── traces/
