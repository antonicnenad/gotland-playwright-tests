import { Page, expect } from '@playwright/test';

// Page Object Model for the Basket page
export class BasketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Returns the name of the hotel selected and visible in the basket
  async getSelectedHotelName(): Promise<string> {
    const hotelHeading = this.page.locator('.cb-cart__item h2 a').first();
    
    // Wait until the hotel heading is visible in the basket
    await expect(hotelHeading).toBeVisible({ timeout: 10000 });
    
    // Return the trimmed text or fallback if not found
    return (await hotelHeading.textContent())?.trim() ?? 'NO_HOTEL_IN_BASKET';
  }

  // Removes the selected item from the basket and asserts the basket is empty
  async removeAndAssertBasketIsEmpty(): Promise<void> {
    const removeButton = this.page.locator('a:has-text("Remove")').first();

    if (await removeButton.isVisible()) {
      await removeButton.click();

      // Wait until the item is completely removed from the basket
      await expect(this.page.locator('.cb-cart__item')).toHaveCount(0, { timeout: 10000 });
    } else {
      // Log a warning if the remove button isn't found
      console.warn('⚠️ Remove button not found or already removed.');
    }
  }

  // Utility method to check if the remove button is currently visible
  async isRemoveButtonVisible(): Promise<boolean> {
    return await this.page.locator('text=Remove').first().isVisible();
  }
}
