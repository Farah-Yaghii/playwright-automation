
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import loginData from '../../src/data/loginData.json';

// TC_UI_001 - Valid Login
test('TC_UI_001 - Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');

    // Keep browser open for 10 seconds
    await page.waitForTimeout(10000);
});

// TC_UI_002 - Data Driven Invalid Login
for (const data of loginData.invalidLogin) {

    test(`TC_UI_002 - ${data.scenario}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(data.username, data.password);

        await expect(loginPage.errorMessage)
            .toHaveText(data.expectedError);

        await expect(page.locator('[data-test="error"]'))
            .toHaveText(data.expectedError);

        await page.waitForTimeout(5000);
    });

}

