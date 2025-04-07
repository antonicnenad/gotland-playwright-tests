# 🧪 Test Cases – Destination Gotland Automation

**Project**: E2E automation of accommodation search and booking  
**Stack**: Playwright + TypeScript + Page Object Model (POM)  
**Runner**: Playwright Test  
**Browsers**: Chromium (Firefox & WebKit excluded)
**Target URL**: https://www2.destinationgotland.se/en/accommodation

---

## TC1-01: Book Accommodation and Validate in Basket

| Field             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| **ID**            | TC1-01                                                                    |
| **Title**         | Book first accommodation and validate it in the basket                    |
| **Preconditions** | User is on the accommodation search page                                  |
| **Steps**         | 1. Open accommodation search page                                         |
|                   | 2. Accept cookies                                                         |
|                   | 3. Select tomorrow’s date using the date picker                           |
|                   | 4. Click "Search"                                                         |
|                   | 5. Pick the first hotel from results and store the hotel name             |
|                   | 6. Click “Book” for that accommodation                                    |
|                   | 7. In the opened section, click the first available "Book now" option     |
|                   | 8. Verify the hotel name shown in the basket matches the one from results |
|                   | 9. Remove the item from basket after assertion                            |

| **Expected** | The hotel is successfully booked, hotel name matches the name before and after booking, and the item is removed from the basket at the end |
| **Tags** | Smoke, Booking, Basket, E2E |

---

## TC1-02: Handle Month Change in Date Picker

| Field             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| **ID**            | TC1-02                                                                    |
| **Title**         | Book accommodation across month boundary                                  |
| **Preconditions** | User is on the accommodation search page                                  |
| **Steps**         | 1. Open accommodation search page                                         |
|                   | 2. Accept cookies                                                         |
|                   | 3. Select tomorrow’s date using the date picker                           |
|                   | - If tomorrow is not visible (e.g. end of the month), click "Next"        |
|                   | 4. Click "Search"                                                         |
|                   | 5. Pick the first hotel from results and store the hotel name             |
|                   | 6. Click “Book” for that accommodation                                    |
|                   | 7. In the opened section, click the first available "Book now" option     |
|                   | 8. Verify the hotel name shown in the basket matches the one from results |
|                   | 9. Remove the item from basket after assertion                            |

| **Expected** | Tomorrow's date is selected even if it requires month change, booking proceeds normally, hotel name matches, and basket is cleaned after |
| **Tags** | Regression, DatePicker, Booking, E2E |

---

## Future Test Ideas

- **TC1-03**: Apply filters (e.g., "Camping") before search
- **TC1-04**: Mobile viewport and responsive layout validation
