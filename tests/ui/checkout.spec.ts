
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test('TC_UI_004 - End-to-End Checkout Flow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Login with valid credentials
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 2: Verify successful login
    await expect(page).toHaveURL(/inventory\.html/);

    // Step 3: Find and add the two most expensive products
    const selectedPrices =
        await productsPage.addTwoMostExpensiveProducts();

    // Verify two products were added to the cart
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
        .toHaveText('2');

    // Step 4: Open cart and proceed to checkout
    await checkoutPage.openCheckout();

    // Step 5: Fill checkout information
    await checkoutPage.fillCheckoutInfo(
        'Test',
        'User',
        '12345'
    );

    // Step 6: Calculate expected total before taxes
    const expectedTotal = selectedPrices.reduce(
        (sum, price) => sum + price, 0
    );

    // Get actual total from checkout page
    const actualTotal = await checkoutPage.getItemTotal();

    // Verify actual total matches expected total
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);

    // Step 7: Finish the order
    await checkoutPage.finishOrder();

    // Verify order confirmation
    await expect(checkoutPage.confirmationMessage)
        .toHaveText('Thank you for your order!');

    // Keep browser open for visual check
    await page.waitForTimeout(10000);
});
