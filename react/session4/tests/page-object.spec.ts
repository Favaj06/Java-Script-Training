import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Journeys via Page Object', () => {

  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {

    dashboard = new DashboardPage(page);

    await dashboard.goto();

  });

  test('adds a new intern', async () => {

    await dashboard.addIntern(
      'Vikram',
      '88',
      'Backend'
    );

    await expect(
      dashboard.internCard('Vikram')
    ).toBeVisible();

    await expect(
      dashboard.internCount
    ).toHaveCount(5);

  });

  test('searches and filters the list', async () => {

    await dashboard.search('Rah');

    await expect(
      dashboard.filteredInternCard('Rahul')
    ).toBeVisible();

    await expect(
      dashboard.filteredInternCount
    ).toHaveCount(1);

  });

  test('clears search and restores all interns', async () => {

    await dashboard.search('Rah');

    await dashboard.clearSearch();

    await expect(
      dashboard.internCount
    ).toHaveCount(4);

  });

  test('removes an intern by name', async () => {

    await dashboard
      .removeButtonFor('Rahul')
      .click();

    await expect(
      dashboard.internCard('Rahul')
    ).not.toBeVisible();

    await expect(
      dashboard.internCount
    ).toHaveCount(3);

  });

  test('shows validation error on empty submit', async () => {

    await dashboard.addButton.click();

    await expect(
      dashboard.validationError()
    ).toBeVisible();

    await expect(
      dashboard.validationError()
    ).toContainText('Name is required');

  });

});

/*
How is dashboard.searchInput found?

The DashboardPage constructor creates all locators once.

Example:

this.searchInput = page.getByLabel('Search');

The tests never need to know how the locator works.

If the Search label changes,
only DashboardPage.ts needs to be updated.

Why is this useful?

The Page Object Model keeps locator code in one place,
making tests shorter, easier to read,
and easier to maintain.
*/
test('chromium-only feature check', async ({ page, browserName }) => {
  // Skip this test on Firefox and WebKit
  test.skip(
    browserName !== 'chromium',
    'This test targets Chromium-specific behaviour only'
  );

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Intern Dashboard' })
  ).toBeVisible();
});

/*
This test is skipped on Firefox and WebKit because some browser
features are not implemented consistently across all browsers.

A real-world example is the CSS :has() selector, which historically
had different levels of support between Chromium, Firefox, and WebKit.
Another example is Chromium-specific browser APIs that may not behave
the same way in other browsers. Using test.skip() ensures the test
runs only where the feature is expected to work correctly.
*/