import { test, expect } from '@playwright/test';
import { AccommodationSearchPage } from '../pages/accommodationSearch.page';
import { ResultsPage } from '../pages/results.page';
import { BookingPage } from '../pages/booking.page';
import { BasketPage } from '../pages/basket.page';

// Test suite for booking flow
test.describe('Booking Flow', () => {
  let searchPage: AccommodationSearchPage;
  let resultsPage: ResultsPage;
  let bookingPage: BookingPage;
  let basketPage: BasketPage;

  // Setup before each test: initialize page objects, navigate, and accept cookies
  test.beforeEach(async ({ page }) => {
    searchPage = new AccommodationSearchPage(page);
    resultsPage = new ResultsPage(page);
    bookingPage = new BookingPage(page);
    basketPage = new BasketPage(page);

    await searchPage.navigate();
    await searchPage.acceptCookiesIfVisible();
  });

  // Cleanup after each test: remove the item from the basket if it exists
  test.afterEach(async () => {
    const isRemoveButtonVisible = await basketPage.isRemoveButtonVisible();

    if (isRemoveButtonVisible) {
      await basketPage.removeAndAssertBasketIsEmpty();
    } else {
      console.warn('⚠️ No item found in basket to remove.');
    }
  });

  // Optional: close the browser after all tests have finished
  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test('TC1-01 @smoke - Book first accommodation and validate basket', async ({ page }) => {
    // Select tomorrow's date from the calendar
    await searchPage.selectTomorrowInDatePicker();

    // Submit the search form
    await searchPage.submitSearch();

    // Store the hotel name from the search results
    const hotelNameBefore = await resultsPage.getFirstAccommodationName();

    // Click on the first "Book now" button
    await resultsPage.clickFirstAccommodationBookButton();

    // Select the first available booking option
    await bookingPage.selectFirstAvailablePriceOption();

    // Retrieve the hotel name from the basket and compare
    const hotelNameAfter = await basketPage.getSelectedHotelName();
    expect(hotelNameAfter).toBe(hotelNameBefore);
  });

  test('TC1-02 @regression - Book accommodation across month boundary', async ({ page }) => {
    // Select tomorrow's date using logic that handles month transitions (e.g. from 31st to 1st)
    await searchPage.selectTomorrowHandlingMonthChange();
  
    // Submit the search form to load available accommodations
    await searchPage.submitSearch();
  
    // Store the name of the first accommodation from the results list
    const hotelNameBefore = await resultsPage.getFirstAccommodationName();
  
    // Click on the "Book" button for that first accommodation
    await resultsPage.clickFirstAccommodationBookButton();
  
    // Select the first available price option (first "Book now" button)
    await bookingPage.selectFirstAvailablePriceOption();
  
    // Fetch the name of the accommodation from the basket
    const hotelNameAfter = await basketPage.getSelectedHotelName();
  
    // Assert that the name from the results page matches the one shown in the basket
    expect(hotelNameAfter).toBe(hotelNameBefore);
  });
});
