import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Verify order summary totals', async ({page}) => {

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

// continue to checkout overview
await checkoutPage.continueCheckout();

// get item total, tax and total
const itemTotalText = await checkoutPage.itemTotal.textContent();
const taxText = await checkoutPage.tax.textContent();
const totalText = await checkoutPage.total.textContent();

// convert text into numbers
const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
const tax = parseFloat(taxText.replace('Tax: $', ''));
const total = parseFloat(totalText.replace('Total: $', ''));

// verify item total + tax = total
expect (itemTotal + tax).toBeCloseTo(total, 2);

});