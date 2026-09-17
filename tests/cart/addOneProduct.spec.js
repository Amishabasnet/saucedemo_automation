import { test, expect } from '@playwright/test';
import { LoginPage} from '../../pages/LoginPage';

test ('Add single item to cart', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

    await addButton.click();

    // Verify cart count
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // verify add to cart changed to remove
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
});