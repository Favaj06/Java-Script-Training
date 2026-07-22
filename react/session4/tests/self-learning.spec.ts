import { test, expect } from '@playwright/test';

test.describe('Self Learning - Playwright', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading...')).not.toBeVisible();
  });

  // ============================================================
  // 1. page.fill() vs page.type()
  // ============================================================

  // Research:
  // page.fill() clears any existing value and immediately fills
  // the input with the specified text.
  //
  // page.type() types one character at a time, simulating real
  // keyboard input. It can also use delays between keystrokes.
  //
  // Use page.fill() when you simply want to set a value quickly.
  // Use page.type() when testing typing behaviour, keyboard
  // events, autocomplete, or live search functionality.

  test('demonstrates the difference between fill() and type()', async ({ page }) => {

    const nameInput = page.getByPlaceholder('Name', { exact: true });

    // fill() replaces the entire value
    await nameInput.fill('Rahul');
    await expect(nameInput).toHaveValue('Rahul');

    // clear the input
    await nameInput.clear();

    // type() enters text like a real user
    await nameInput.type('Rahul');

    await expect(nameInput).toHaveValue('Rahul');
  });

  // ============================================================
  // 2. keyboard.press()
  // ============================================================

  // Research:
  // page.keyboard.press() simulates pressing a keyboard key.
  // It is useful for testing keyboard navigation, shortcuts,
  // accessibility, and focus movement.

  test('moves focus to score input using Tab', async ({ page }) => {

    const nameInput = page.getByPlaceholder('Name', { exact: true });
    const scoreInput = page.getByPlaceholder('Score', { exact: true });

    await nameInput.click();
    await nameInput.fill('Vikram');

    await page.keyboard.press('Tab');

    await expect(scoreInput).toBeFocused();
  });
  // ============================================================
  // 3. page.screenshot()
  // ============================================================

  // Research:
  // page.screenshot() captures the current state of the page
  // and saves it as an image file. It is useful for debugging,
  // documenting UI changes, and reporting failures.

  test('takes a screenshot and saves it', async ({ page }) => {

    await page.screenshot({
      path: 'test-results/intern-dashboard.png',
      fullPage: true,
    });

  });

  // ============================================================
  // 4. test.only() and test.skip()
  // ============================================================

  // Research:
  // test.only() runs only the marked test and skips every other
  // test in the suite. It is useful while debugging a specific
  // test but should never be committed because it prevents the
  // remaining tests from running.
  //
  // test.skip() skips a test temporarily. It is useful when a
  // feature is not yet implemented, is currently broken, or when
  // a test is not applicable in a particular environment.

  test('demonstrates test.only() and test.skip() concepts', async ({ page }) => {

    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();

  });

});