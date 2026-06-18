import { test, expect } from '@playwright/test';

// ✅ Page Object — represents the Login page
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: ' Login' });
    this.successMessage = page.getByText('You logged into a secure area!');
    this.errorMessage = page.locator('#flash');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// ✅ Tests — clean, readable, no page details here
test.describe('Login functionality', () => {

  test('Valid credentials show success message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(loginPage.successMessage).toBeVisible();
  });

  test('Invalid password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'wrongpassword');
    await expect(loginPage.errorMessage).toContainText('Your password is invalid!');
  });

  test('Invalid username shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wronguser', 'SuperSecretPassword!');
    await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
  });

  test('Empty fields show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
  });

});