# EPAM Client Work Test Scenario

## Overview
This test scenario validates the user journey from the EPAM homepage through the Services menu to the Client Work page.

## Test Scenario Details

### Steps Executed:
1. **Navigate** to https://www.epam.com/
2. **Select** "Services" from the header menu
3. **Click** the "Explore Our Client Work" link
4. **Verify** that "Client Work" text is visible on the page

## Test File
- **Location:** `tests/epam-client-work.spec.ts`
- **Framework:** Playwright with TypeScript
- **Test Type:** End-to-End (E2E)

## Prerequisites

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

## Running the Tests

### Run all tests in the file:
```bash
npx playwright test tests/epam-client-work.spec.ts
```

### Run with UI mode (interactive):
```bash
npx playwright test tests/epam-client-work.spec.ts --ui
```

### Run in headed mode (see browser):
```bash
npx playwright test tests/epam-client-work.spec.ts --headed
```

### Run with specific browser:
```bash
npx playwright test tests/epam-client-work.spec.ts --project=chromium
npx playwright test tests/epam-client-work.spec.ts --project=firefox
npx playwright test tests/epam-client-work.spec.ts --project=webkit
```

### Debug mode:
```bash
npx playwright test tests/epam-client-work.spec.ts --debug
```

## Test Coverage

The test suite includes:
- ✅ Basic navigation flow validation
- ✅ Header menu interaction
- ✅ Link clicking and page transitions
- ✅ Text visibility verification
- ✅ URL validation
- ✅ Page title verification
- ✅ Screenshot capture on failure

## Expected Results

### Test 1: Navigation Flow
- **Pass Criteria:**
  - "Services" link is clickable in header
  - "Explore Our Client Work" link is clickable
  - "Client Work" text is visible on the destination page
  - URL contains relevant path keywords

### Test 2: Page Validation
- **Pass Criteria:**
  - Page title contains relevant keywords
  - Main heading (h1) is visible

## Troubleshooting

### Test Failures
If tests fail, check:
1. **Network connectivity** - Ensure access to https://www.epam.com/
2. **Element selectors** - Website structure may have changed
3. **Page load timing** - Adjust `waitForLoadState` if needed
4. **Locators** - Text-based locators are case-insensitive but may need adjustment

### Common Issues
- **Timeout errors:** Increase timeout in `playwright.config.ts`
- **Element not found:** Website structure changed, update selectors
- **Flaky tests:** Add explicit waits or retry logic

## Configuration

### Recommended playwright.config.ts settings:
```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.epam.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## Maintenance Notes
- **Created:** 2024
- **Last Updated:** 2024
- **Selector Strategy:** Text-based locators using `getByRole` and `getByText` for maintainability
- **Stability:** Uses network idle and explicit waits for reliable execution

## CI/CD Integration

### GitHub Actions Example:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test tests/epam-client-work.spec.ts
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Contact
For questions or issues with this test scenario, please create an issue in the repository.
