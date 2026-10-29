# FineXa Tech — Playwright Automation Screening Task

This project contains Playwright Test automation written in TypeScript for the two websites specified in the take-home assessment.

## Coverage

### Part 1 — Playwright Documentation

Website: https://playwright.dev

- Verify that the home page title contains "Playwright".
- Click "Get started" and verify that the URL contains `/docs/intro`.
- Verify that the "Installation" heading is visible.
- Search for "locators" and verify that a result appears.

### Part 2 — TodoMVC

Website: https://demo.playwright.dev/todomvc

- Add three todos and verify that the list contains three items.
- Complete one todo and verify the remaining-item counter.
- Verify the Active and Completed filters.
- Edit a todo using a double-click.
- Delete a todo and verify that it is removed.
- Clear completed todos while keeping active todos.

### Code Quality and Configuration

- TypeScript with Playwright Test.
- Page Object Model for the TodoMVC page.
- `beforeEach` setup in test suites.
- `baseURL` configured in `playwright.config.ts`.
- Tests run on Chromium.
- HTML report enabled.
- Trace captured on the first retry.
- No fixed sleeps or XPath selectors.

## Prerequisites

- Node.js (LTS recommended)
- npm
- Internet connection to access the test websites

## Installation

Open a terminal in the project folder and run:

```bash
npm install
npx playwright install chromium
```

## Running the Tests

Run all tests:

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Open the HTML report after a test run:

```bash
npm run report
```

Check TypeScript for compilation errors:

```bash
npx tsc --noEmit
```

## Optional Bonus

A GitHub Actions workflow is included at `.github/workflows/playwright.yml` to run the tests on pushes and pull requests.
