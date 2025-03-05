import { Locator } from "playwright";

export async function getNumericValueFromText(locator: Locator): Promise<number> {
    const text = await locator.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ""));
}

export function calculateTotalPrice(priceWithoutShipping: number, shippingPrice: number): number {
    return parseFloat((priceWithoutShipping + shippingPrice).toFixed(2));
}
