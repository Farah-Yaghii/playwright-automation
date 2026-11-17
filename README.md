
# Playwright UI & API Automation Framework

[![Playwright Automation Tests](https://github.com/Farah-Yaghii/playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Farah-Yaghii/playwright-automation/actions/workflows/playwright.yml)

## 1. Project Overview

This project is a scalable UI and API test automation framework built using Playwright and TypeScript.

It automates SauceDemo web application scenarios and Simple Books API operations using Page Object Model (POM), reusable API helpers, external test data, and GitHub Actions CI/CD.

## 2. Prerequisites

- Node.js 22.x
- npm 10.x or a compatible npm version
- Git

Check installed versions:

```bash
node --version
npm --version
git --version
```

## 3. Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/Farah-Yaghii/playwright-automation.git
```

2. Navigate to the project directory:

```bash
cd playwright-automation
```

3. Install dependencies:

```bash
npm ci
```

4. Install Playwright browsers:

```bash
npx playwright install chromium firefox
```

## 4. Running Tests

Run all UI and API tests:

```bash
npx playwright test
```

Run UI tests only:

```bash
npx playwright test tests/ui
```

Run API tests only:

```bash
npx playwright test tests/api
```

Run tests on Chromium and Firefox:

```bash
npx playwright test --project=chromium --project=firefox
```

Run Chromium tests:

```bash
npx playwright test --project=chromium
```

Run Firefox tests:

```bash
npx playwright test --project=firefox
```

Run UI tests with a visible browser:

```bash
npx playwright test tests/ui --headed --workers=1
```

## 5. Architecture & Project Structure

The framework follows the Page Object Model (POM) design pattern to separate UI interactions from test assertions.

```text
playwright-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml     # GitHub Actions CI/CD
├── src/
│   ├── pages/                 # UI Page Object Model classes
│   ├── api/                   # Reusable API request methods
│   ├── fixtures/              # Global setup and teardown
│   ├── data/                  # External JSON test data
│   └── utils/                 # Random test data utilities
├── tests/
│   ├── ui/                    # SauceDemo UI tests
│   └── api/                   # Simple Books API tests
├── playwright.config.ts       # Playwright configuration
├── package.json               # Dependencies and scripts
├── package-lock.json          # Dependency lockfile
├── tsconfig.json              # TypeScript configuration
├── .gitignore                 # Excluded generated files
└── README.md                  # Project documentation
```

### Architecture Decisions

- **Page Object Model:** Keeps UI locators and interactions separate from test logic.
- **API Helpers:** Centralizes reusable API operations.
- **External JSON Data:** Supports data-driven test execution.
- **Utilities:** Generates unique values for dynamic API requests.
- **Global Setup and Teardown:** Logs the start and completion of the test suite.
- **Cross-Browser Testing:** Runs tests using Chromium and Firefox.

## 6. Test Scenarios

### UI Test Cases — SauceDemo

| Test ID | Scenario | Validation |
|---|---|---|
| TC_UI_001 | Valid Login | Verify successful login and navigation to Products |
| TC_UI_002 | Invalid Login | Verify errors for missing username, missing password, and invalid credentials |
| TC_UI_003 | Sort Products Z to A | Verify reverse-alphabetical product order |
| TC_UI_004 | End-to-End Checkout | Select two most expensive products, validate subtotal before tax, and confirm order |

### API Test Cases — Simple Books API

| Test ID | Scenario | Validation |
|---|---|---|
| TC_API_001 | Authenticate and Create Order | Verify token generation, HTTP 201, and returned order ID |
| TC_API_002 | Get Order | Verify HTTP 200 and order details |
| TC_API_003 | Update Order | Verify HTTP 204 and updated customer name |
| TC_API_004 | Delete Order | Verify HTTP 204 and subsequent HTTP 404 |

API tests use dynamically generated email addresses and reusable API helpers.

## 7. Test Reports

Playwright generates an HTML test report after test execution.

To open the report locally:

1. Run the test suite:

```bash
npx playwright test
```

2. Open the HTML report:

```bash
npx playwright show-report
```

3. Review test results, errors, and execution details in the browser.

Screenshots are captured on test failures, and traces are collected on the first retry.

## 8. CI/CD — GitHub Actions

The workflow is located at:

`.github/workflows/playwright.yml`

### Workflow Triggers

- Pushes and merges into the `main` branch
- Daily scheduled execution at 3:00 AM Amman time (00:00 UTC)
- Manual execution using GitHub Actions

### Workflow Steps

1. Checkout the repository.
2. Set up Node.js 22.
3. Install project dependencies.
4. Install Playwright browsers.
5. Execute tests on Chromium and Firefox.
6. Upload the HTML report as an artifact, even if tests fail.

### View CI Reports

1. Open the GitHub repository.
2. Select the **Actions** tab.
3. Open the latest **Playwright Automation Tests** workflow run.
4. Scroll down to the **Artifacts** section.
5. Download `playwright-html-report`.
6. Extract the downloaded ZIP file.
7. Open `index.html` to view the report.

## 9. Framework Features

- Playwright with TypeScript
- Page Object Model (POM)
- Data-driven testing using JSON
- API CRUD testing
- Dynamic product selection by price
- Cross-browser execution
- Global setup and teardown logging
- Random test data generation
- HTML reports, screenshots, and traces
- Automated CI/CD with GitHub Actions

## Repository

https://github.com/Farah-Yaghii/playwright-automation
