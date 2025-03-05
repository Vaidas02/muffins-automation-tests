import { Page } from "@playwright/test";
import { CheckOutPage } from "../pages/checkout-page";

export class CheckOutPageAssertions extends CheckOutPage {
    override readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyUnitPriceInsideCheckout(expectedUnitPrice: number) {
        await this.verifyPrices(this.unitPrice, expectedUnitPrice);
    }

    async verifySubTotalPriceInsideCheckout(expectedSubTotalPrice: number) {
        await this.verifyPrices(this.subTotalPrice, expectedSubTotalPrice);
    }

    async verifyShippingPriceInsideCheckout(expectedShippingPrice: number) {
        await this.verifyPrices(this.shippingPrice, expectedShippingPrice);
    }

    async verifyTotalPriceInside(expectedTotalPrice: number) {
        await this.verifyPrices(this.totalPrice, expectedTotalPrice);
    }
}
