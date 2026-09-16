import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login with empty password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', '');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText('Password is required');
});