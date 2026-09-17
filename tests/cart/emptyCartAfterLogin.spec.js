import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Verify cart is empty after fresh login', async ({page}) => {

    const loginPage = new LoginPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // verify product page
    await expect(page).toHaveURL(/inventory.html/);

    // verify cart badge is not visible
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

    // open cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // verify cart page
    await expect(page).toHaveURL(/cart.html/);

    // verify there are no products in cart
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
});