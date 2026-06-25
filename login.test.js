import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {

  test('Valid credentials show success message', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });

  test('Invalid password shows error message', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('Your password is invalid!')).toBeVisible();
  });

  test('Invalid username shows error message', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('wronguser');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Empty fields show error message', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('XSS input in username field is rejected', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill(`<script>alert('hacked')</script>`);
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Only spaces for username shows error message', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('   ');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

});