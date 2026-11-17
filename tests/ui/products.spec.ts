
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
//
test('TC_UI_003 - Products Sorting Z to A', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Step 1: Login with valid credentials
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login
    await expect(page).toHaveURL(/inventory\.html/);

    // Step 2: Select Z to A sorting from the dropdown
    await productsPage.sortByNameZA();

    // Step 3: Get actual product names from the website
    const actualNames = await productsPage.getProductNames();

    // Step 4: Create expected order by sorting a copy Z to A
    const expectedNames = [...actualNames].sort((a, b) =>
        b.localeCompare(a)
    );

    // Step 5: Verify the product list is not empty
    expect(actualNames.length).toBeGreaterThan(0);

    // Verify actual order matches expected order
    expect(actualNames).toEqual(expectedNames);

    // Keep browser open for 10 seconds (visual check only)
    await page.waitForTimeout(10000);
});
