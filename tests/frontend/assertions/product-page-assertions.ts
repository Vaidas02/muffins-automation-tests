import { expect, Page } from "@playwright/test";
import { ProductPage } from "../pages/product-page";

export class ProductPageAssertions extends ProductPage {
    override readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyProductName(productName: string) {
        await expect(this.productNameHeading(productName)).toBeVisible();
    }

    async verifyProductPrice(expectedPrice: number) {
        await this.verifyPrices(this.productPrice, expectedPrice);
    }

    async verifyProductNameInsideCart(expectedName: string) {
        const actualText = await this.productNameInsideCart.innerText();
        expect(actualText.trim()).toBe(expectedName);
    }

    async verifyProductPriceInsideCart(expectedPrice: number) {
        await this.verifyPrices(this.productPriceInsideCart, expectedPrice);
    }
}
