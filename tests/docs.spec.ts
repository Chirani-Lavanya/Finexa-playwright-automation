import { test, expect } from '@playwright/test';

test.describe('Playwright documentation website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('home page title contains Playwright', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/i);
  });

  test('Get started opens the introduction page and shows Installation', async ({ page }) => {
    await page.getByRole('link', { name: /get started/i }).first().click();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(
      page.getByRole('heading', { name: 'Installation', exact: true })
    ).toBeVisible();
  });

  test('site search finds locators', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: /search/i }).first();
    await searchButton.click();

    const searchInput = page.getByPlaceholder(/search/i).first();
    await expect(searchInput).toBeVisible();
    await searchInput.fill('locators');

    // Wait for the search UI to show a matching result; no fixed sleep is used.
    const locatorResult = page.getByText(/locators/i).first();
    await expect(locatorResult).toBeVisible({ timeout: 10000 });
  });
});
