
import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locate the product sorting dropdown
        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );

        // Locate all product names
        this.productNames = page.locator(
            '[data-test="inventory-item-name"]'
        );
    }

    // Sort products by name from Z to A
    async sortByNameZA() {
        await this.sortDropdown.selectOption('za');
    }

    // Get all product names
    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    // Find the two most expensive products and add them to cart
    async addTwoMostExpensiveProducts(): Promise<number[]> {

        // Step 1: Get all products from the page
        const products = this.page.locator(
            '[data-test="inventory-item"]'
        );

        // Store each product price and index
        const productData: { price: number; index: number }[] = [];

        // Step 2: Read each product price
        for (let i = 0; i < await products.count(); i++) {

            const priceText = await products.nth(i)
                .locator('[data-test="inventory-item-price"]')
                .innerText();

            // Convert price text to a number
            const price = Number(priceText.replace('$', ''));

            productData.push({ price, index: i });
        }

        // Step 3: Sort products by price (highest first)
        productData.sort((a, b) => b.price - a.price);

        // Step 4: Select the two most expensive products
        const topTwo = productData.slice(0, 2);

        // Step 5: Add both products to the cart
        for (const product of topTwo) {

            // Find the selected product
            const selectedProduct = products.nth(product.index);

            // Click the Add to cart button
            await selectedProduct
                .locator('button[data-test^="add-to-cart"]')
                .click();

            // Verify the product was successfully added
            // The button should change from Add to cart to Remove
            await expect(
                selectedProduct.locator(
                    'button[data-test^="remove"]'
                )
            ).toBeVisible();
        }

        // Step 6: Verify the cart contains two products
        await expect(
            this.page.locator('[data-test="shopping-cart-badge"]')
        ).toHaveText('2');

        // Step 7: Return selected prices for checkout validation
        return topTwo.map(product => product.price);
    }
}
