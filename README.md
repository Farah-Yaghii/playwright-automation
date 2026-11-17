
# Playwright UI & API Automation Framework

## Project Overview

This project is an automated testing framework built using
Playwright and TypeScript.

It covers UI testing for SauceDemo and API testing for
the Simple Books API.

## Technologies

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Project Structure

- src/pages: Page Object Model classes
- src/api: API helper methods
- src/data: External test data
- src/utils: Random test data generator
- src/fixtures: Global setup and teardown
- tests/ui: UI test cases
- tests/api: API test cases
- .github/workflows: CI/CD configuration

## UI Test Scenarios

- TC_UI_001: Valid Login
- TC_UI_002: Invalid Login (Data-Driven)
- TC_UI_003: Sort Products Z to A
- TC_UI_004: End-to-End Checkout

## API Test Scenarios

- TC_API_001: Create Order
- TC_API_002: Get Order
- TC_API_003: Update Order
- TC_API_004: Delete Order and Verify 404

## Installation

Install project dependencies:

    npm ci

Install required browsers:

    npx playwright install chromium firefox

## Run Tests

Run all tests:

    npx playwright test

Run UI tests:

    npx playwright test tests/ui

Run API tests:

    npx playwright test tests/api

Run Chromium tests:

    npx playwright test --project=chromium

Run Firefox tests:

    npx playwright test --project=firefox

Run UI tests with a visible browser:

    npx playwright test tests/ui --headed --workers=1

## Test Reports

Generate and view the HTML report:

    npx playwright show-report

Screenshots are captured on test failures.
Traces are collected on the first retry.

## CI/CD

GitHub Actions runs automated tests:

- After changes are pushed or merged into main
- Every day at 3:00 AM Amman time
- Manually using workflow_dispatch

The workflow uploads the HTML test report as an artifact.

## Test Framework Features

- Page Object Model (POM)
- Data-driven login testing
- API CRUD operations
- Dynamic product selection
- Cross-browser testing
- Global setup and teardown
- Random test data generation
- HTML reporting
- GitHub Actions integration
