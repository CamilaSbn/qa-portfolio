import { test, expect } from '@playwright/test';

// ✅ Reusable helper — write once, use everywhere
async function login(page, username, password) {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: ' Login' }).click();
}

test.describe('Login functionality', () => {

  test('Valid credentials show success message', async ({ page }) => {
    await login(page, 'tomsmith', 'SuperSecretPassword!');
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });

  test('Invalid password shows error message', async ({ page }) => {
    await login(page, 'tomsmith', 'wrongpassword');
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
  });

  test('Invalid username shows error message', async ({ page }) => {
    await login(page, 'wronguser', 'SuperSecretPassword!');
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Empty fields show error message', async ({ page }) => {
    await login(page, '', '');
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

});