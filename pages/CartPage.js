export class CartPage {

    constructor(page) {
        this.page = page;

        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cardBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async openCart() {
        await this.cartLink.click();
    }
}