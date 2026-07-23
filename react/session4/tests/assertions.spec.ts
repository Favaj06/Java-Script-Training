import { test, expect } from '@playwright/test';

test.describe('Assertions — State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add Intern button is enabled', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Add Intern' })
    ).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(
      page.getByLabel('Name')
    ).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Present' })
    ).toBeChecked();
  });

  test('name input receives focus when clicked', async ({ page }) => {

    const nameInput = page.getByLabel('Name');

    await nameInput.click();

    await expect(nameInput).toBeFocused();

  });

});

/*
toBeEnabled() verifies that the button can actually be clicked.
A button can be visible but disabled.
toBeVisible() only checks that the button appears on the page.
*/

test.describe('Assertions — Attributes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has checkbox type', async ({ page }) => {

    await expect(
      page.getByRole('checkbox', { name: 'Present' })
    ).toHaveAttribute('type', 'checkbox');

  });

});

/*
toHaveClass(/dark/) uses a regular expression because an element
may contain multiple CSS classes such as:

class="container dark active"

An exact string comparison would fail if additional classes exist,
while the regex only checks that "dark" is present.
*/

test.describe('Assertions — Page Level', () => {

  test('page title exists', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveTitle(/.+/);

  });

  test('page URL is root', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveURL('http://localhost:5173/');

  });

});

test.describe('Screenshot Assertion', () => {

  test('dashboard screenshot', async ({ page }) => {

    await page.goto('/');

    await expect(page.getByText('Loading...')).not.toBeVisible();

    await expect(page).toHaveScreenshot('intern-dashboard.png');

  });

});

/*
Screenshot Findings:

1. On the first run, Playwright creates a baseline screenshot because none exists.
   The test reports that the snapshot was missing.

2. On the second run, Playwright compares the current screenshot with the baseline.
   If there are no visual differences, the test passes.

3. If any visible UI changes (such as text, color, or layout) are made,
   Playwright detects the difference, generates a diff image,
   and the screenshot test fails until the baseline is updated.
*/
