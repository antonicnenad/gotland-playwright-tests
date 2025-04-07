# Use the official Playwright base image with all browsers
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory inside container
WORKDIR /app

# Copy everything to /app
COPY . .

# Install dependencies
RUN npm ci

# Run tests by default
CMD ["npx", "playwright", "test"]
