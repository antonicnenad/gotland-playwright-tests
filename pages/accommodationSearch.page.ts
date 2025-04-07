import { Page, Locator, expect } from '@playwright/test';

// Page Object Model for the Accommodation Search Page
export class AccommodationSearchPage {
  readonly page: Page;
  readonly checkInButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locator for the check-in date picker field
    this.checkInButton = page.getByTitle('Check-in', { exact: true });

    // Locator for the cookie consent button
    this.acceptCookiesButton = page.getByRole('button', { name: 'Godkänn alla' });

    // Locator for the search button
    this.searchButton = page.getByRole('link', { name: 'Search' });
  }

  // Navigates to the accommodation search page
  async navigate(): Promise<void> {
    await this.page.goto('https://www2.destinationgotland.se/en/accommodation');
  }

  // Accepts cookies if the consent modal is visible
  async acceptCookiesIfVisible(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }

  // Opens the date picker and selects tomorrow's date
  async selectTomorrowInDatePicker(): Promise<void> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDay = tomorrow.getDate().toString();

    // Open the date picker
    await this.checkInButton.click();

    // Select the correct day from the calendar
    await this.page.getByRole('cell', { name: tomorrowDay, exact: true }).getByRole('link').click();
  }

  // Select tomorrow's date from the calendar, and handle case where tomorrow is in the next month
async selectTomorrowHandlingMonthChange(): Promise<void> {
    // Get today's and tomorrow's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDay = tomorrow.getDate().toString();
  
    // Open the date picker by clicking the "Check-in" button
    await this.checkInButton.click();
  
    // Try to locate tomorrow's date cell in the current calendar view
    const dateCell = this.page
      .locator('#cb-ui-datepicker-div')
      .getByRole('cell', { name: tomorrowDay, exact: true });
  
    // If the date cell is not found (e.g. tomorrow is in the next month), click the "Next" button
    if (await dateCell.count() === 0) {
      await this.page
        .locator('#cb-ui-datepicker-div')
        .getByTitle('Next', { exact: true })
        .click();
    }
  
    // Finally, click the correct date link inside the calendar
    await this.page
      .locator('#cb-ui-datepicker-div')
      .getByRole('cell', { name: tomorrowDay, exact: true })
      .getByRole('link')
      .click();
  }
  
  

  // Clicks the "Search" button to submit the form
  async submitSearch(): Promise<void> {
    await this.searchButton.click();
  }
}
