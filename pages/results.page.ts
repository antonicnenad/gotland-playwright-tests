import { Page, Locator } from '@playwright/test';

// Page Object Model for the Results Page
export class ResultsPage {
  readonly page: Page;
  readonly firstAccommodationTitle: Locator;
  readonly firstAccommodationBookButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locator for the title (name) of the first accommodation in the results list
    this.firstAccommodationTitle = page.locator('.cb_prod_name h2 a').first();

    // Locator for the "Book now" button of the first accommodation
    this.firstAccommodationBookButton = page.getByRole('link', { name: 'Book now' }).first();
  }

  // Method to get the name of the first accommodation
  async getFirstAccommodationName(): Promise<string> {
    // If text is not found, return fallback string
    return (await this.firstAccommodationTitle.textContent())?.trim() ?? 'NO_HOTEL_NAME';
  }

  // Method to click the "Book now" button on the first accommodation
  async clickFirstAccommodationBookButton(): Promise<void> {
    await this.firstAccommodationBookButton.click();
  }
}
