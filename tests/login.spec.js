const { test, expect } = require("@playwright/test");

  test(`Login Test`, async ({ page }) => {
    // Navigate to Home Page
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle('The Internet');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
    await expect(page.locator('//h1[@class="heading"]')).toContainText('Welcome to the-internet');
    await expect(page.locator('//h2')).toContainText('Available Examples');

    // Navigate Login Page
    await page.locator('text=Form Authentication').click();
    await expect(page).toHaveTitle('The Internet');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    await expect(page.locator('//h2')).toContainText('Login Page');

    // Login
    await page.fill('id=username', 'tomsmith');
    await page.fill('id=password', 'SuperSecretPassword!');
    await page.locator('//button[@type="submit"]').click();

    // Validate Login
    await expect(page.locator('id=flash')).toContainText('You logged into a secure area!');
    await expect(page.locator('//h2')).toContainText('Secure Area');

    // Logout
    await page.locator('//a[@class="button secondary radius"]').click();

    // Validate Logout
    await expect(page.locator('id=flash')).toContainText('You logged out of the secure area!');
  });