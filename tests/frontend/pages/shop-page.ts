import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";
import { getProductNameAndPrice } from "../../../utils/helpers/product-helpers";
import { clickElement } from "../../../utils/helpers/common-helpers";
import { ElementRole } from "../../../utils/enum/locators-enum";
import { ElementName } from "../../../utils/enum/element-names-enum";

export class ShopPage extends BasePage {
    override readonly page: Page;
    readonly productList: Locator;
    readonly productLinks: Locator;
    readonly productPrices: Locator;
    readonly thankYouForYourOrderHeading: Locator;
    readonly gotItButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productList = page.locator(".product-list__content");
        this.productLinks = this.productList.locator("a.product-list__link");
        this.productPrices = this.productList.locator("span[data-v-04e2fa8c]");
        this.thankYouForYourOrderHeading = page.getByRole(ElementRole.Heading, { name: ElementName.ThankYouForYourOrderHeading });
        this.gotItButton = page.getByRole(ElementRole.Button, { name: ElementName.GotItButton });
    }

    async selectRandomProduct(): Promise<{ name: string; price: number }> {
        await this.productList.waitFor({ state: "visible" });

        const count = await this.productLinks.count();
        if (count === 0) throw new Error("No products found.");

        const randomIndex = Math.floor(Math.random() * count);
        const randomProduct = this.productLinks.nth(randomIndex);
        const randomPrice = this.productPrices.nth(randomIndex);

        const productDetails = await getProductNameAndPrice(randomProduct, randomPrice);

        await clickElement(randomProduct);

        return productDetails;
    }

    async clickGotItButton() {
        await clickElement(this.gotItButton);
    }
}
