import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login with empty username', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText('Username is required');
});