import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Cancel checkout from Step One', async ({ page }) => {

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

    // Verify Checkout Step One
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Click Cancel
    await checkoutPage.cancelCheckout();

    // Verify user returns to Cart page
    await expect(page).toHaveURL(/cart.html/);

    // Verify Backpack is still in cart
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    // Verify cart badge still shows 1
    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');
});