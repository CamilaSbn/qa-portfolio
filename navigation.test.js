import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

  test('Homepage has correct title', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
    await expect(page).toHaveTitle('The Internet');
  });

  test('Add Element button adds a Delete button', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.getByRole('button', { name: 'Add Element' }).click();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  });

  test('Delete button removes the added element', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.getByRole('button', { name: 'Add Element' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
  });

  test('Broken image page loads without crashing', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    await expect(page).toHaveTitle('The Internet');
  });

});