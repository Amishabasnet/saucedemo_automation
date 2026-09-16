import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('TC_SD_PL_009 - verify product images for problem_user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('problem_user', 'secret_sauce');

    await expect(productPage.productItems).toHaveCount(6);

    const imageSources = await productPage.productImages
        .evaluateAll(images =>
            images.map(image => image.getAttribute('src'))
        );

    // Each product should have its own correct image
    const uniqueImages = new Set(imageSources);

    expect(uniqueImages.size).toBe(6);
});