import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC_SD_PL_010 - verify Backpack image for visual_user', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('visual_user', 'secret_sauce');

    const backpack = page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: 'Sauce Labs Backpack' });

    const backpackImage = backpack.locator('img');

    await expect(backpackImage).toBeVisible();

    await expect(backpackImage)
        .toHaveAttribute(
            'src',
            /sauce-backpack/
        );
});