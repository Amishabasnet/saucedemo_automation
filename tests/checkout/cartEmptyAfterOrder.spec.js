import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Verify cart is empty after completing an order', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add Backpack to cart
    await page
        .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();

    // Verify cart shows 1
    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

    // Open cart
    await page
        .locator('[data-test="shopping-cart-link"]')
        .click();

    // Click Checkout
    await page
        .locator('[data-test="checkout"]')
        .click();

    // Fill checkout information
    await checkoutPage.fillInformation(
        'Ram',
        'Chandra',
        '44600'
    );

    // Continue to Step Two
    await checkoutPage.continueCheckout();

    // Finish order
    await checkoutPage.finishCheckout();

    // Verify order completed
    await expect(
        checkoutPage.completeHeader
    ).toHaveText('Thank you for your order!');

    // Click Back Home
    await checkoutPage.backHomeButton.click();

    // Verify Products page
    await expect(page).toHaveURL(/inventory.html/);

    // Verify cart badge is gone
    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).not.toBeVisible();
});