import { Page, Locator } from '@playwright/test';

// Page Object Model for the Booking section where price options are shown
export class BookingPage {
  readonly page: Page;

  // Locator for the first "Book" button among the available price options
  readonly firstBookNowButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Selects the first input button with value "Book"
    this.firstBookNowButton = page.locator('input[type="button"][value="Book"]').first();
  }

  // Method to click the first available booking option
  async selectFirstAvailablePriceOption(): Promise<void> {
    await this.firstBookNowButton.click();
  }
}
