import { test, expect } from '@playwright/test';

test.describe('Forms', () => {

  test('Dropdown: select an option by value', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('#dropdown', '1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
  });

  test('Dropdown: select Option 2', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
  });

  test('Checkboxes: first checkbox can be checked', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const checkbox1 = page.locator('input[type="checkbox"]').first();
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
  });

  test('Checkboxes: second checkbox is checked by default', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const checkbox2 = page.locator('input[type="checkbox"]').last();
    await expect(checkbox2).toBeChecked();
  });

});