import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login with invalid password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret@124');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});