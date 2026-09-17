import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Remove item from Products page', async ({page}) => {
    const loginPage = new LoginPage(page);

    // login
    await loginPage.goto();
    await loginPage.login('standard_user', "secret_sauce");

    // add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // verify cart badge shows 1
    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText("1");

    // remove backpack
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // verify cart badge disappears
    await expect (page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

    // verify button changes back to Add to Cart
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText('Add to cart');
})