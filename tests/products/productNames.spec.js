import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('TC_SD_PL_008 - verify product name', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(productPage.productNames).toHaveCount(6);

    const productNames =
        await productPage.productNames.allTextContents();

    expect(productNames).toContain('Sauce Labs T-Shirt (Red)');
});