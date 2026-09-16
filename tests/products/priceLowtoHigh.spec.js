import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('TC_SD_PL_004 - sort price low to high', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.sortBy('lohi');

    const priceTexts =
        await productPage.productPrices.allTextContents();

    const prices =
        priceTexts.map(price =>
            Number(price.replace('$', ''))
        );

    const sortedPrices =
        [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
});