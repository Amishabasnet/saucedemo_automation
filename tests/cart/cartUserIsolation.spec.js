import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Verify cart data is isolated between users', async ({page}) => {

    const loginPage = new LoginPage(page);

    // login as user A 
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // verify cart shows 1
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Open menu
    await page.getByRole('button', { name: 'Open Menu' }).click();

    // logout user A
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // login as user B
    await loginPage.login('problem_user', 'secret_sauce');

    // open cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // verify user A's backpack is NOT in user B's cart
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();

    // verify cart is empty
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);

});