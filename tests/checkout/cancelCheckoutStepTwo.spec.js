import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Cancel checkout from Step Two', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add Backpack to cart
    await page
        .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();

    // Open cart
    await page
        .locator('[data-test="shopping-cart-link"]')
        .click();

    // Click Checkout
    await page
        .locator('[data-test="checkout"]')
        .click();

    // Fill valid checkout information
    await checkoutPage.fillInformation(
        'Ram',
        'Chandra',
        '44600'
    );

    // Continue to Step Two
    await checkoutPage.continueCheckout();

    // Verify Checkout Step Two
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Click Cancel
    await checkoutPage.cancelCheckout();

    // Verify user returns to Products page
    await expect(page).toHaveURL(/inventory.html/);

    // Verify Products page
    await expect(
        page.locator('[data-test="title"]')
    ).toHaveText('Products');

    // Verify cart item is retained
    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

    // Verify Backpack still shows Remove
    await expect(
        page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toHaveText('Remove');
});