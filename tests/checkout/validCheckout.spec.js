import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Complete checkout with valid information', async ({page}) => {
    
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // open cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // click checkout
    await page.locator('[data-test="checkout"]').click();

    // fill checkout information
    await checkoutPage.fillInformation('Ram', 'Chandra', '44600');

    // continue to overview
    await checkoutPage.continueCheckout();

    // verify overview page
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // finish order
    await checkoutPage.finishCheckout();

    // verify confirmation message
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

    // verify final URL
    await expect(page).toHaveURL(/checkout-complete.html/);
});