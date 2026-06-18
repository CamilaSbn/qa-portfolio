import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const loginData = JSON.parse(readFileSync(resolve('test-data/login-data.json'), 'utf-8'));

for (const { scenario, username, password, expectedText } of loginData) {
  test(`Login: ${scenario}`, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText(expectedText)).toBeVisible();
  });
}