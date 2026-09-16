import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login with performance_glitch_user credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('performance_glitch_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
})