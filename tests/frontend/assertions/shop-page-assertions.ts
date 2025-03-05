import { expect, Page } from "@playwright/test";
import { ProductPage } from "../pages/product-page";
import { ShopPage } from "../pages/shop-page";

export class ShopPageAssertions extends ShopPage {
    override readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifythankYouForOrderMessage() {
        await expect(this.thankYouForYourOrderHeading).toBeVisible();
    }
}
