
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly itemTotal: Locator;
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
    }

    async openCheckout() {
        await this.cartButton.click();
        await this.checkoutButton.click();
    }

    async fillCheckoutInfo(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async getItemTotal(): Promise<number> {
        const text = await this.itemTotal.innerText();
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}
