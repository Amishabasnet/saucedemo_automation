import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Verify cart persists after navigation', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // verify cart badge shows 1
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // open backpack product details
    await page.getByText('Sauce Labs Backpack').click();

    // verify product details page
    await expect(page).toHaveURL(/inventory-item.html/);

    // navigate back to Products page
    await page.locator('[data-test="back-to-products"]').click();

    // verify returned to Products page
    await expect(page).toHaveURL(/inventory.html/);

    // verify cart still contains 1 item
    await expect( page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // verify backpack still shows remove
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
});