import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC_SD_PL_006 - view product details', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.getByText('Sauce Labs Backpack').click();

    await expect(page).toHaveURL(/inventory-item.html/);

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    await expect(
        page.locator('[data-test="inventory-item-desc"]')
    ).toBeVisible();

    await expect(
        page.locator('[data-test="inventory-item-price"]')
    ).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Add to cart' })
    ).toBeVisible();
});