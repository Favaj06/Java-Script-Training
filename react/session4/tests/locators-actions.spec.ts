import { test, expect } from '@playwright/test';

test.describe('Scoped Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("asserts Rahul's data using scoped locators", async ({ page }) => {

    // Scoped locators search only inside Rahul's card.
    // This avoids matching similar elements elsewhere on the page.
    const rahulCard = page
      .locator('div')
      .filter({
        has: page.getByText('Rahul — 92')
      })
      .last();

    await expect(
      rahulCard.getByText('Rahul — 92')
    ).toBeVisible();

    await expect(
      rahulCard.getByRole('button', {
        name: 'Remove'
      })
    ).toBeVisible();

  });

  test("asserts two different intern cards independently", async ({ page }) => {

    const rahulCard = page
      .locator('div')
      .filter({
        has: page.getByText('Rahul — 92')
      })
      .last();

    const priyaCard = page
      .locator('div')
      .filter({
        has: page.getByText('Priya — 78')
      })
      .last();

    await expect(
      rahulCard.getByText('Rahul — 92')
    ).toBeVisible();

    await expect(
      priyaCard.getByText('Priya — 78')
    ).toBeVisible();

  });

  test("fills the Add Intern form using scoped locators", async ({ page }) => {

    // Scope all actions to the Add Intern form.
    // This prevents interacting with similar inputs elsewhere.
    const form = page.getByRole('form', {
      name: 'Add Intern'
    });

    await form
      .getByPlaceholder('Name')
      .fill('Vikram');

    await form
      .getByPlaceholder('Score')
      .fill('75');

    await form
      .getByRole('button', {
        name: 'Add Intern'
      })
      .click();

    // Scope the verification to Vikram's card.
    const vikramCard = page
      .locator('div')
      .filter({
        has: page.getByText('Vikram — 75')
      })
      .last();

    await expect(
      vikramCard.getByText('Vikram — 75')
    ).toBeVisible();

    await expect(
      vikramCard.getByRole('button', {
        name: 'Remove'
      })
    ).toBeVisible();

  });

});
test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('fill sets the input value directly', async ({ page }) => {

    await page.getByPlaceholder('Name').fill('Vikram');

    await expect(
      page.getByPlaceholder('Name')
    ).toHaveValue('Vikram');

  });

  test('selectOption selects by visible label text', async ({ page }) => {

    // Selecting by label uses the visible text shown to users.
    await page
      .getByRole('combobox', { name: 'Role' })
      .selectOption({ label: 'Backend' });

    await expect(
      page.getByRole('combobox', { name: 'Role' })
    ).toHaveValue('Backend');

  });

  test('selectOption selects by value attribute', async ({ page }) => {

    // Selecting by value uses the option's value attribute.
    await page
      .getByRole('combobox', { name: 'Role' })
      .selectOption('Frontend');

    await expect(
      page.getByRole('combobox', { name: 'Role' })
    ).toHaveValue('Frontend');

  });

  test('checkbox is checked by default', async ({ page }) => {

    const presentCheckbox =
      page.getByRole('checkbox', { name: 'Present' });

    await expect(presentCheckbox).toBeChecked();

  });

  test('uncheck removes the checked state', async ({ page }) => {

    const presentCheckbox =
      page.getByRole('checkbox', { name: 'Present' });

    await presentCheckbox.uncheck();

    await expect(presentCheckbox).not.toBeChecked();

  });

  test('check re-applies the checked state', async ({ page }) => {

    const presentCheckbox =
      page.getByRole('checkbox', { name: 'Present' });

    await presentCheckbox.uncheck();

    await presentCheckbox.check();

    await expect(presentCheckbox).toBeChecked();

  });

  test('Tab moves focus from name input to score input', async ({ page }) => {

    const nameInput =
      page.getByPlaceholder('Name');

    const scoreInput =
      page.getByPlaceholder('Score');

    await nameInput.focus();

    await expect(nameInput).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(scoreInput).toBeFocused();

  });

  test('Enter inside name input validates the form', async ({ page }) => {

    await page
      .getByPlaceholder('Name')
      .fill('Vikram');

    await page
      .getByPlaceholder('Name')
      .press('Enter');

    // Score defaults to 0, so Vikram is added.
    await expect(
      page.getByText('Vikram — 0')
    ).toBeVisible();

  });

  test('clear() empties the input', async ({ page }) => {

    const scoreInput =
      page.getByPlaceholder('Score');

    await scoreInput.fill('92');

    await scoreInput.clear();

    await expect(scoreInput).toHaveValue('');

  });

  test('type() fires individual key events', async ({ page }) => {

    await page
      .getByLabel('Search')
      .type('Rah');

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

  });

});

// selectOption({ label: 'Backend' }) selects using the text visible to the user.
// selectOption('Backend') selects using the option's value attribute.
// Selecting by value is usually more stable because visible labels may change
// while the underlying value often stays the same.

// check() guarantees that the checkbox ends in the checked state.
// click() simply toggles the checkbox, so if it is already checked,
// clicking would incorrectly uncheck it.

// locator.press('Tab') sends the key to that specific element.
// page.keyboard.press('Tab') sends the key to whichever element currently has focus.

// fill() replaces the entire value instantly.
// type() enters characters one by one and triggers keyboard events,
// making it useful for live search, autocomplete, and incremental validation.
test('debug: inspect form state mid-test', async ({ page }) => {

  await page.goto('/');

  await page.getByLabel('Name').fill('Debug Intern');

  // Test pauses here and opens the Playwright Inspector.
  // Remove this line before committing the project.
  await page.pause();

  await page
    .getByRole('button', { name: 'Add Intern' })
    .click();

  await expect(
    page.getByText('Debug Intern — 0')
  ).toBeVisible();

});

/*
When is page.pause() useful?

1. It helps inspect the actual page state when a locator fails.
   You can verify whether the element exists, is visible,
   or whether the locator is targeting the correct element.

2. It helps debug timing and UI issues.
   You can observe whether elements appear after animations,
   loading, or React state updates before the next action runs.

Remove page.pause() before committing because it pauses the test
and will cause automated CI pipelines to wait indefinitely.
*/