import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test ('Add multiple item to cart', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add sauce labs backpack
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // add sauce labs bike light
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // add sauce demo labs bolt t-shirt
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // verify cart badge shows 3
    await expect(
        page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

    // verify all three buttons changed to Remove
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');

    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toHaveText('Remove');

    await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toHaveText('Remove');
});