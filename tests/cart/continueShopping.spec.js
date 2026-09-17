import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Verify Continue Shopping button', async ({page}) => {

    const loginPage = new LoginPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // verify cart badge shows 1
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // open cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // verify cart page
    await expect(page).toHaveURL(/cart.html/);

    // click continue shopping
    await page.locator('[data-test="continue-shopping"]').click();

    // verify user returns to Products page
    await expect(page).toHaveURL(/inventory.html/);

    // verify products title
    await expect( page.locator('[data-test="title"]')).toHaveText('Products');

    // verify cart contents are retained
    await expect( page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});