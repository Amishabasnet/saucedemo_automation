export class CheckoutPage {

    constructor(page) {
        this.page = page;

        // Checkout Step One
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');

        // Checkout Step Two
        this.finishButton = page.locator('[data-test="finish"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');

        // Checkout Complete
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    // Fill checkout information
    async fillInformation(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    // Click Continue
    async continueCheckout() {
        await this.continueButton.click();
    }

    // Click Finish
    async finishCheckout() {
        await this.finishButton.click();
    }

    // Click Cancel
    async cancelCheckout() {
        await this.cancelButton.click();
    }
}