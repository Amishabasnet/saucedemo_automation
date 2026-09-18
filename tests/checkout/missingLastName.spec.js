import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Checkout with missing LastName', async ({page}) => {

    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // open cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // click checkoutPage
    await page.locator('[data-test="checkout"]').click();

    // fill checkout information
    await checkoutPage.fillInformation('Ram', '', '44600');

    // continue to checkout
    await checkoutPage.continueCheckout();

    // verify error message
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');

    // verify user stays on checkout step one
    await expect(page).toHaveURL(/checkout-step-one.html/);
});