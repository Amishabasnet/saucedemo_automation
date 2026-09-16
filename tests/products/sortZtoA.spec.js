import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('TC_SD_PL_003 - sort products Z to A', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.sortBy('za');

    const names = await productPage.productNames.allTextContents();

    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);
});