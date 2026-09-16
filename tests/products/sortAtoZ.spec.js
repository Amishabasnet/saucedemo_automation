import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('TC_SD_PL_002 - sort products A to Z', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.sortBy('az');

    const names = await productPage.productNames.allTextContents();
    const sortedNames = [...names].sort();

    expect(names).toEqual(sortedNames);
});