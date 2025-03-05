import { expect, Locator, Page } from "@playwright/test";
import { clickElement } from "../../../utils/helpers/common-helpers";
import { ElementRole } from "../../../utils/enum/locators-enum";
import { CommonAssertions } from "../assertions/common-assertions";
import { getNumericValueFromText } from "../../../utils/helpers/price-helpers";
import { ElementName } from "../../../utils/enum/element-names-enum";

export class ProductPage extends CommonAssertions {
    override readonly page: Page;
    readonly productNameHeading: (productName: string) => Locator;
    readonly addToBagButton: Locator;
    readonly productPrice: Locator;
    readonly productNameInsideCart: Locator;
    readonly productPriceInsideCart: Locator;
    readonly totalPriceInsideCart: Locator;
    readonly quantityNumber: Locator;
    readonly addQuantityButton: Locator;
    readonly checkOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productNameHeading = (productName) => page.getByRole(ElementRole.Heading, { name: productName });
        this.productPrice = page.locator(".block-product__price.body-large");
        this.productNameInsideCart = page.locator("p[class='cart__title']");
        this.productPriceInsideCart = page.locator(".cart__text.cart__price");
        this.totalPriceInsideCart = page.locator("p[class='cart__title cart__title--with-slot'] span");
        this.quantityNumber = page.locator(".quantity-picker__amount.quantity-picker__amount--borderless");
        this.addQuantityButton = page.getByRole(ElementRole.Complementary).getByRole(ElementRole.Button, { name: ElementName.AddQuantityButton });
        this.checkOutButton = page.getByRole(ElementRole.Button, { name: ElementName.CheckoutButton });
        this.addToBagButton = page.getByRole(ElementRole.Button, { name: ElementName.AddToBagButton });
    }

    async clickButtonAddToBag() {
        await clickElement(this.addToBagButton);
    }

    async clickQuantityButton(times: number) {
        for (let i = 0; i < times; i++) {
            await this.addQuantityButton.click();
        }
    }

    async clickCheckoutButton() {
        await clickElement(this.checkOutButton);
    }

    async verifyTotalPriceInsideCart(): Promise<{ priceWithoutShipping: number; unitPrice: number }> {
        const unitPrice = await getNumericValueFromText(this.productPriceInsideCart);

        const quantityText = await this.quantityNumber.inputValue();
        const quantity = parseInt(quantityText.trim(), 10);

        const expectedTotal = unitPrice * quantity;

        const actualTotal = await getNumericValueFromText(this.totalPriceInsideCart);
        expect(actualTotal).toBe(expectedTotal);

        return { unitPrice, priceWithoutShipping: actualTotal };
    }
}
