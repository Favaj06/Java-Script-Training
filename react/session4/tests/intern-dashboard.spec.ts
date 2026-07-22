    import { test, expect } from '@playwright/test';

    test.describe('Intern Dashboard', () => {

    // Navigate to the home page before every test.
    // This avoids repeating page.goto('/') in each test
    // and ensures every test starts from the same initial state.
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('shows the page title', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: 'Intern Dashboard' })
        ).toBeVisible();
    });

    test('shows the initial intern names', async ({ page }) => {
        await expect(page.getByText('Loading...')).not.toBeVisible();

        // .last() avoids Playwright strict mode because
        // the same name appears more than once on the page.
        await expect(page.getByText('Rahul').last()).toBeVisible();
        await expect(page.getByText('Priya').last()).toBeVisible();
        await expect(page.getByText('Amit').last()).toBeVisible();
        await expect(page.getByText('Sneha').last()).toBeVisible();
    });

    test('shows the correct number of intern cards', async ({ page }) => {
        // Each card has a Remove button.
        // Counting Remove buttons is equivalent to counting intern cards.
        await expect(
        page.getByRole('button', { name: 'Remove' })
        ).toHaveCount(4);
    });

    // Playwright's toBeVisible() checks that an element exists
    // and is actually visible to the user.
    // React Testing Library's toBeInTheDocument() only checks
    // that the element exists in the DOM, even if it is hidden.
    test('shows the theme toggle button', async ({ page }) => {
        await expect(
        page.getByRole('button', { name: /switch to dark mode/i })
        ).toBeVisible();
    });

    });

    test.describe('Locator Practice — getByRole', () => {

    // Navigate to the home page before every test.
    // This ensures every test starts from the same initial state.
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // getByRole is the preferred locator because it finds elements
    // based on their accessible role and name. It is more reliable
    // and user-friendly than getByTestId.
    test('finds the Add Intern button by role', async ({ page }) => {
        const addButton = page.getByRole('button', { name: 'Add Intern' });
        await expect(addButton).toBeVisible();
    });

    test('finds the heading by role', async ({ page }) => {
        const heading = page.getByRole('heading', { name: 'Intern Dashboard' });
        await expect(heading).toBeVisible();
    });

    test('finds the name input by placeholder', async ({ page }) => {
        const nameInput = page.getByPlaceholder('Name', { exact: true });
        await expect(nameInput).toBeVisible();
    });

    test('finds the name input by placeholder and checks it is empty', async ({ page }) => {
        const nameInput = page.getByPlaceholder('Name', { exact: true });
        await expect(nameInput).toBeVisible();
        await expect(nameInput).toBeEmpty();
    });

    test('finds the score input by placeholder', async ({ page }) => {
    const scoreInput = page.getByPlaceholder('Score', { exact: true });

    await expect(scoreInput).toBeVisible();
    await expect(scoreInput).toHaveValue('0');
    });

    test('finds text with exact matching', async ({ page }) => {
        await expect(page.getByText('Rahul').last()).toBeVisible();
    });

    test('finds text with regex matching', async ({ page }) => {
        await expect(page.getByText(/Rahul/).last()).toBeVisible();
    });

    test('asserts that an absent element is not visible', async ({ page }) => {
        await expect(page.getByText('Placeholder')).not.toBeVisible();
    });

    // .last() is used because multiple elements contain the same text.
    // It avoids Playwright's strict mode violation by selecting the
    // last matching element.
    });
    test.describe('Assertions', () => {

    // Navigate to the home page before every test.
    // This ensures every test starts from the same initial state.
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('heading has the correct text', async ({ page }) => {
        await expect(
        page.getByRole('heading', { name: 'Intern Dashboard' })
        ).toHaveText('Intern Dashboard');
    });

    test('theme toggle button contains the word "Dark"', async ({ page }) => {
        await expect(
        page.getByRole('button', { name: /switch to dark mode/i })
        ).toContainText('Dark');
    });

    test('error message is not visible initially', async ({ page }) => {
        await expect(
        page.getByText('Name is required')
        ).not.toBeVisible();
    });

    // toHaveText() checks the complete text of an element.
    // toContainText() checks whether the expected text is
    // present anywhere inside the element's text.
    test('name input is empty initially', async ({ page }) => {
        await expect(
        page.getByPlaceholder('Name', { exact: true })
        ).toHaveValue('');
    });

    test('score input is 0 initially', async ({ page }) => {
        await expect(
        page.getByPlaceholder('Score', { exact: true })
        ).toHaveValue('0');
    });

    test('correct number of Remove buttons matches the intern count', async ({ page }) => {
        await expect(
        page.getByRole('button', { name: 'Remove' })
        ).toHaveCount(4);
    });

    // Observation:
    // If toHaveCount(5) is used instead of toHaveCount(4),
    // Playwright waits for about 5 seconds, retries automatically,
    // and then fails because only 4 matching elements exist.
    });

// Section 6 Observations

// Observation from UI Mode:
// The Playwright UI shows every action on a timeline and highlights
// the locator on the page. This makes it easier to understand
// which step failed compared to terminal output.

// Headless mode runs tests without opening a browser window,
// making it faster and suitable for CI. Headed mode opens a real
// browser window, which helps observe interactions and debug UI behaviour.

// Section 7 Observations

// HTML Report Observation:
// The HTML report showed the screenshot captured at the moment
// of failure, the expected and actual values, and the exact step
// where the test failed. This made it easier to understand the
// problem than the terminal output alone.

// Trace Viewer Observation:
// Timeline helps identify the exact step where a failure occurred.
// Screenshots show how the page looked during each action.
// Network helps diagnose failed or slow HTTP requests.
// DOM Snapshot allows inspection of the page structure at any step,
// making it easier to understand why a locator failed.