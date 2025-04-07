# 🧪 GotlandAccommodationTests

> Automated E2E test suite for Destination Gotland accommodation search and booking system  
> Built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern.

---

## 📁 Project Structure

```
GotlandAccommodationTests/
├── tests/                          # Test definitions (spec files)
│   └── accommodationBooking.spec.ts
│
├── pages/                          # Page Object Models (encapsulate page interactions)
│   ├── accommodationSearch.page.ts
│   ├── results.page.ts
│   ├── booking.page.ts
│   └── basket.page.ts
│
├── TEST-CASES.md                  # Test cases for this project
├── playwright.config.ts           # Playwright configuration
├── Dockerfile                     # Docker setup for running tests in isolated container
├── .dockerignore                  # Files to exclude from Docker image
├── package.json                   # Project metadata and scripts
├── tsconfig.json                  # TypeScript compiler options
└── README.md                      # You're reading it!
```

---

## 🧠 Test Case Overview

### ✅ **TC1-01: Book First Accommodation and Validate Basket**

- Select tomorrow’s date from the calendar
- Submit the search
- Store the name of the first accommodation from the results list
- Click "Book" and choose the first available "Book now" option
- Verify the selected accommodation name matches the one shown in the basket
- Clean up by removing the item from the basket

### ✅ **TC1-02: Book Across Month Boundary**

- If today is the last day of the month (e.g., August 31), the calendar will not display tomorrow (e.g., September 1) by default
- Test includes logic to detect this and click the **“Next”** month arrow
- Then proceeds with the same booking and validation logic as TC1-01

---

## 🚀 Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional but recommended for isolated test runs)

---

## 🛠️ Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/antonicnenad/gotland-playwright-tests.git
cd GotlandAccommodationTests
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ Run Tests Locally

### Run all tests:

```bash
npx playwright test
```

### Run tests with tags:

```bash
npx playwright test --grep @smoke
```

---

## 🐳 Running Tests in Docker

### 1. Build Docker Image

```bash
docker build -t gotland-tests .
```

### 2. Run Tests in Docker

```bash
docker run --rm gotland-tests
```

> This command builds and runs all tests headlessly inside the container.

---

## ⚙️ Docker Compose (optional)

If you prefer `docker-compose`, you can use the provided config:

**`docker-compose.yml`**

```yaml
version: "3.9"
services:
  tests:
    build: .
    container_name: gotland-playwright
    command: npx playwright test
```

### Run with Docker Compose

```bash
docker-compose up --build
```

---

## 🏷️ Tags

Use tags to organize and filter your tests.

```ts
test('TC1-01 @smoke - Book first accommodation and validate basket', async ({ page }) => { ... })

test('TC1-02 @regression - Book accommodation across month boundary', async ({ page }) => { ... })
```

Then run with:

```bash
npx playwright test --grep @smoke
```

---

## 📜 Notes

- All tests follow the **Page Object Model (POM)** structure for maintainability
- Tests run in Chromium by default (you can include Firefox and WebKit via config if needed)
- Each test includes **auto-cleanup** logic that removes selected items from the basket after assertions

---

## 🧑‍💻 Author

**Nenad Antonic**  
QA Automation Engineer
[LinkedIn](https://www.linkedin.com/in/nenadantonic-qa//) | [GitHub](https://github.com/antonicnenad)

---

## 📄 License

MIT License
