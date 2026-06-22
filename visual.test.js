import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PASSWORD = 'secret_sauce';

test.describe('Visual Regression — Sauce Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
  });

  test('Products page matches snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('products-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02
    });
  });

  test('Cart page matches snapshot', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveScreenshot('cart-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02
    });
  });

  test('Checkout form matches snapshot', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveScreenshot('checkout-form.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02
    });
  });

});