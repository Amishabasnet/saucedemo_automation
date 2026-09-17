import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Remove Item from Cart', async ({page}) => {

    const loginPage = new LoginPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // verify cart badge shows
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Open cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page
    await expect(page).toHaveURL(/cart.html/);

    // remove backpack from Cart page
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // verify backpack is removed
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();

    // verify cart badge disappears
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});