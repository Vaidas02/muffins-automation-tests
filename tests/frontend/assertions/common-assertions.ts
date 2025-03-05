import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../pages/base-page";

export class CommonAssertions extends BasePage {
    override readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyPrices(locator: Locator, expectedPrice: number) {
        const actualNumber = await locator.innerText();
        const numericValue = parseFloat(actualNumber.replace(/[^0-9.]/g, ""));
        const roundedValue = numericValue.toFixed(2);
        expect(parseFloat(roundedValue)).toBe(expectedPrice);
    }
}
