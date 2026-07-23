import { type Page, type Locator } from '@playwright/test';

/*
Page Object Model (POM)

The main advantage of the Page Object Model is maintainability.

All locators are stored in one place.
If the React component changes (for example, the "Name" label
changes to "Intern Name"), only this file needs to be updated.
The test files remain unchanged because they call methods like
addIntern() instead of using raw locators.
*/

export class DashboardPage {

  readonly page: Page;

  readonly nameInput: Locator;
  readonly scoreInput: Locator;
  readonly roleSelect: Locator;

  readonly addButton: Locator;
  readonly resetButton: Locator;

  readonly searchInput: Locator;

  constructor(page: Page) {

    this.page = page;

    this.nameInput =
      page.getByLabel('Name');

    this.scoreInput =
      page.getByLabel('Score');

    this.roleSelect =
      page.getByRole('combobox', { name: 'Role' });

    this.addButton =
      page.getByRole('button', { name: 'Add Intern' });

    this.resetButton =
      page.getByRole('button', { name: 'Reset' });

    this.searchInput =
      page.getByLabel('Search');

  }

  async goto() {

    await this.page.goto('/');

  }

  async addIntern(
    name: string,
    score: string,
    role = 'Frontend'
  ) {

    await this.nameInput.fill(name);

    await this.scoreInput.clear();

    await this.scoreInput.fill(score);

    await this.roleSelect.selectOption(role);

    await this.addButton.click();

  }

  async search(query: string) {

    await this.searchInput.fill(query);

  }

  async clearSearch() {

    await this.searchInput.clear();

  }

  internCard(name: string): Locator {

    return this.page
      .getByText(new RegExp(`^${name} — \\d+$`))
      .locator('..');

  }

  filteredInternCard(name: string): Locator {

    return this.page
      .getByRole('heading', { name, level: 4 })
      .locator('..');

  }

  removeButtonFor(name: string): Locator {

    return this
      .internCard(name)
      .getByRole('button', { name: 'Remove' });

  }

  get internCount(): Locator {

    return this.page
      .getByRole('button', { name: 'Remove' });

  }

  get filteredInternCount(): Locator {

    return this.page
      .getByRole('heading', { level: 4 });

  }

  /*
  locatorA.or(locatorB)

  Returns a locator that matches either locator.

  This is useful when the same UI element can be
  rendered in different ways.

  Example:
  Some pages may use

  <div role="alert">

  while others use

  <p class="error">

  The same test works for both.
  */

  validationError(): Locator {

    return this.page
      .getByRole('alert')
      .or(
        this.page.locator('[class*="error"]')
      );

  }

}