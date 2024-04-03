const { test, expect } = require("@playwright/test");

  test(`Login Test`, async ({ page }) => {
    // Navigate to Home Page
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle('The Internet');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
    await expect(page.locator('class=heading')).toContainText('Welcome to the-internet');

    // Navigate Login Page
    await page.locator('text=Form Authentication').click();
    await expect(page).toHaveTitle('Login - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/login');
    await expect(page.locator('h2=login-page-main-header')).toContainText('Login Page');

    // Login
    await page.fill('id=username', 'tomsmith');
    await page.fill('id=password', 'SuperSecretPassword!');
    await page.locator('id=btn_submit').click();

    // Validate Login
    await expect(page.locator('id=current_user_name')).toContainText('Demouser');
    await expect(page.locator("id=LogoutMenuItem")).toContainText(`Logout Demouser`);
    await expect(page).toHaveTitle('Sign the Guestbook - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/form.php');
    await expect(page.locator('id=sign-form-main-header')).toContainText('Sign The Guestbook');

    // Logout
    await page.locator('id=LogoutMenuItem').click();

    // Validate Logout
    await expect(page.locator('id=LoginMenuItem')).toHaveText('Login');
    await expect(page.locator('id=LogoutMenuItem')).not.toBeVisible();
    await expect(page.locator('id=current_user_name')).not.toBeVisible();
  });