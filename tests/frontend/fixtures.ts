import { test as base } from "@playwright/test";
import { ProductPageAssertions } from "./assertions/product-page-assertions";
import { CommonAssertions } from "./assertions/common-assertions";
import { CheckOutPageAssertions } from "./assertions/checkout-page-assertions";
import { ShopPageAssertions } from "./assertions/shop-page-assertions";

export type Fixtures = {
    shopPage: ShopPageAssertions;
    productPage: ProductPageAssertions;
    basePage: CommonAssertions;
    checkOutPage: CheckOutPageAssertions;
};

export const test = base.extend<Fixtures>({
    shopPage: async ({ page }, use) => {
        const shopPage = new ShopPageAssertions(page);
        await shopPage.goTo("/shop");
        await use(shopPage);
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPageAssertions(page));
    },

    basePage: async ({ page }, use) => {
        await use(new CommonAssertions(page));
    },

    checkOutPage: async ({ page }, use) => {
        await use(new CheckOutPageAssertions(page));
    },
});

export { expect } from "@playwright/test";
