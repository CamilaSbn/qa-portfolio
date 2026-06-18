import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PASSWORD = 'secret_sauce';

test.describe('Sauce Demo — Login', () => {

  test('Standard user can log in', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Locked out user sees error message', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  });

  test('Empty credentials show error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

});

test.describe('Sauce Demo — Product Catalog', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
  });

  test('Products page shows 6 items', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });

  test('Products can be sorted by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const prices = page.locator('.inventory_item_price');
    const first = await prices.first().innerText();
    const last = await prices.last().innerText();
    expect(parseFloat(first.replace('$', ''))).toBeLessThan(parseFloat(last.replace('$', '')));
  });

});

test.describe('Sauce Demo — Shopping Cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
  });

  test('Adding item updates cart badge', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Cart shows added item', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

});

test.describe('Sauce Demo — Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
  });

  test('Complete checkout flow end to end', async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Camila');
    await page.locator('[data-test="lastName"]').fill('Saibene');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.summary_info')).toBeVisible();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('Checkout requires all fields', async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

});