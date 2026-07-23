import { test, expect } from '@playwright/test';

test.describe('User Journey — Add Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /*
    This journey test verifies that the complete application works
    together. Unlike a Vitest unit test, it checks the real browser,
    user interactions, React state updates, context updates,
    and that the new intern actually appears in the UI.
  */

  test('user fills the form and the new intern appears in the list', async ({ page }) => {

    // Initial intern count
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    // Fill the form
    await page.getByLabel('Name').fill('Vikram');

    const score = page.getByLabel('Score');
    await score.clear();
    await score.fill('88');

    await page
      .getByRole('combobox', { name: 'Role' })
      .selectOption('Frontend');

    // Submit
    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    // New intern appears
    await expect(
      page.getByText('Vikram — 88')
    ).toBeVisible();

    // Count increases
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(5);

  });

  test('new intern has the correct score', async ({ page }) => {

    await page.getByLabel('Name').fill('Vikram');

    const score = page.getByLabel('Score');
    await score.clear();
    await score.fill('88');

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByText('Vikram — 88')
    ).toBeVisible();

  });

  test('new intern with another score is added correctly', async ({ page }) => {

    await page.getByLabel('Name').fill('Ravi');

    const score = page.getByLabel('Score');
    await score.clear();
    await score.fill('45');

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByText('Ravi — 45')
    ).toBeVisible();

  });

  test('form resets after successful submission', async ({ page }) => {

    await page.getByLabel('Name').fill('Vikram');

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByLabel('Name')
    ).toHaveValue('');

    // Your form resets score back to 0
    await expect(
      page.getByLabel('Score')
    ).toHaveValue('0');

  });

});
test.describe('User Journey — Add Intern Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows error when submitting with empty name', async ({ page }) => {

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByText('Name is required')
    ).toBeVisible();

  });

  test('does not add intern when name is empty', async ({ page }) => {

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

  });

  test('error clears after entering a valid name and resubmitting', async ({ page }) => {

    // Trigger validation error
    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByText('Name is required')
    ).toBeVisible();

    // Enter valid name
    await page.getByLabel('Name').fill('Vikram');

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    // Error disappears
    await expect(
      page.getByText('Name is required')
    ).not.toBeVisible();

    // Intern is added
    await expect(
      page.getByText('Vikram — 0')
    ).toBeVisible();

  });

  test('shows error when score is above 100', async ({ page }) => {

    await page.getByLabel('Name').fill('Vikram');

    const score = page.getByLabel('Score');

    await score.clear();

    await score.fill('150');

    await page
      .getByRole('button', { name: 'Add Intern' })
      .click();

    await expect(
      page.getByText('Score must be between 0 and 100')
    ).toBeVisible();

  });

});
test.describe('User Journey — Search and Filter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /*
    type() simulates real user typing by sending one key at a time.
    It triggers keyboard events for each character, making it ideal
    for search boxes that filter results while the user types.
    fill() replaces the entire value instantly.
  */

  test('typing in search filters the intern list', async ({ page }) => {

    // Search for Rahul
    await page.getByLabel('Search').type('Rah');

    // Rahul should be visible
    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

    // Other interns should not be visible
    await expect(
      page.getByRole('heading', { name: 'Priya' })
    ).not.toBeVisible();

  });

  test('clearing search restores all interns', async ({ page }) => {

    const search = page.getByLabel('Search');

    await search.fill('Rah');

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

    await search.clear();

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Priya' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Amit' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Sneha' })
    ).toBeVisible();

  });

  test('search is case-insensitive', async ({ page }) => {

    await page.getByLabel('Search').fill('rahul');

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

  });

  test('no matching intern shows empty state message', async ({ page }) => {

    await page.getByLabel('Search').fill('zzz');

    await expect(
      page.getByText('No Intern Found')
    ).toBeVisible();

  });

});
test.describe('User Journey — Remove Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /*
    We scope the Remove button to Rahul's row instead of using .first().
    Using .first() depends on the order of the list.
    If another intern is added before Rahul, .first() removes the wrong person.
    By locating Rahul's row text first and then finding the Remove button
    inside Rahul's row, we always remove the correct intern.
  */

  test('clicking Remove on Rahul removes Rahul from the list', async ({ page }) => {

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).toBeVisible();

    const rahulCard = page
      .getByText('Rahul — 92', { exact: true })
      .locator('..');

    await rahulCard
      .getByRole('button', { name: 'Remove' })
      .click();

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).not.toBeVisible();

  });

  test('intern count decreases after removal', async ({ page }) => {

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    const rahulCard = page
      .getByText('Rahul — 92', { exact: true })
      .locator('..');

    await rahulCard
      .getByRole('button', { name: 'Remove' })
      .click();

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(3);

  });

  test('other interns remain after one is removed', async ({ page }) => {

    const rahulCard = page
      .getByText('Rahul — 92', { exact: true })
      .locator('..');

    await rahulCard
      .getByRole('button', { name: 'Remove' })
      .click();

    await expect(
      page.getByRole('heading', { name: 'Priya' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Amit' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Sneha' })
    ).toBeVisible();

  });

  test('removed intern does not reappear after page interaction', async ({ page }) => {

    const rahulCard = page
      .getByText('Rahul — 92', { exact: true })
      .locator('..');

    await rahulCard
      .getByRole('button', { name: 'Remove' })
      .click();

    // Trigger a re-render
    const search = page.getByLabel('Search');

    await search.fill('A');

    await search.clear();

    await expect(
      page.getByRole('heading', { name: 'Rahul' })
    ).not.toBeVisible();

  });

});
/*
The Playwright Inspector allows me to execute the test one step at a time
and see the exact browser state after each action. It also highlights the
locator being used and shows whether it matches any elements.

This makes it easier to identify problems such as incorrect locators,
timing issues, or unexpected page states, which are more difficult to
understand from the terminal error message alone.
*/

/*
The DOM Snapshot was the most useful pane because it showed the exact
state of the application when the assertion ran. I could clearly see
that Rahul had already been removed from the list, which explained why
the 'not.toBeVisible()' assertion succeeded. This made it easier to
understand the page state than relying only on the terminal output.
*/
