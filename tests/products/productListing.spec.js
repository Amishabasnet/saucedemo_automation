import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('TC_SD_PL_001 - verify all 6 products display', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(productPage.productItems).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
        await expect(productPage.productNames.nth(i)).toBeVisible();
        await expect(productPage.productDescriptions.nth(i)).toBeVisible();
        await expect(productPage.productPrices.nth(i)).toBeVisible();
        await expect(productPage.productImages.nth(i)).toBeVisible();
    }
});