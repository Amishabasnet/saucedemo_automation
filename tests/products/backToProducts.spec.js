import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC_SD_PL_007 - navigate back to products', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.getByText('Sauce Labs Backpack').click();

    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(/inventory.html/);

    await expect(
        page.locator('[data-test="title"]')
    ).toHaveText('Products');
});