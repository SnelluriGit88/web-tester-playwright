import { test, expect } from '@playwright/test';

/**
 * Test Scenario: EPAM Client Work Navigation
 * 
 * This test verifies the user journey from the EPAM homepage
 * through the Services menu to the Client Work page.
 * 
 * Steps:
 * 1. Navigate to EPAM homepage
 * 2. Click on "Services" in the header menu
 * 3. Click on "Explore Our Client Work" link
 * 4. Verify "Client Work" text is visible on the page
 */

test.describe('EPAM Website - Client Work Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to EPAM homepage before each test
    await page.goto('https://www.epam.com/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to Client Work page via Services menu', async ({ page }) => {
    // Step 1: Navigate to homepage (handled in beforeEach)
    console.log('✓ Navigated to https://www.epam.com/');

    // Step 2: Select "Services" from the header menu
    // Look for Services link in the header/navigation area
    const servicesLink = page.locator('header').getByRole('link', { name: /services/i });
    await servicesLink.click();
    console.log('✓ Clicked "Services" in header menu');

    // Wait for navigation or menu to appear
    await page.waitForLoadState('networkidle');

    // Step 3: Click the "Explore Our Client Work" link
    const clientWorkLink = page.getByRole('link', { name: /explore our client work/i });
    await clientWorkLink.click();
    console.log('✓ Clicked "Explore Our Client Work" link');

    // Wait for the Client Work page to load
    await page.waitForLoadState('networkidle');

    // Step 4: Verify that "Client Work" text is visible on the page
    const clientWorkText = page.getByText(/client work/i);
    await expect(clientWorkText).toBeVisible();
    console.log('✓ Verified "Client Work" text is visible');

    // Additional validation: Check the URL contains relevant path
    await expect(page).toHaveURL(/client-work|clients|work/i);
    console.log('✓ URL validation passed');
  });

  test('should verify page title and heading after navigation', async ({ page }) => {
    // Navigate through the same flow
    await page.locator('header').getByRole('link', { name: /services/i }).click();
    await page.waitForLoadState('networkidle');
    
    await page.getByRole('link', { name: /explore our client work/i }).click();
    await page.waitForLoadState('networkidle');

    // Verify page title contains relevant keywords
    const title = await page.title();
    expect(title).toMatch(/client|work|case|studies/i);
    console.log(`✓ Page title verified: ${title}`);

    // Verify main heading is visible
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    console.log('✓ Main heading is visible');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure for debugging
    if (testInfo.status !== 'passed') {
      const screenshot = await page.screenshot();
      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  });
});
