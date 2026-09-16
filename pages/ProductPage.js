// pages/ProductPage.js

export class ProductPage {

    constructor(page) {
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]');
        this.productItems = page.locator('[data-test="inventory-item"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productDescriptions = page.locator('[data-test="inventory-item-desc"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
        this.productImages = page.locator('.inventory_item_img img');

        this.sortDropdown =
            page.locator('[data-test="product-sort-container"]');

        this.backToProducts =
            page.locator('[data-test="back-to-products"]');
    }

    async sortBy(option) {
        await this.sortDropdown.selectOption(option);
    }
}