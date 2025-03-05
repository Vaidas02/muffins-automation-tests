import { Locator } from "playwright";

export async function getProductNameAndPrice(productLocator: Locator, priceLocator: Locator): Promise<{ name: string; price: number }> {
    const productText = await productLocator.innerText();
    const priceText = await priceLocator.innerText();

    const productName = productText.replace(/€\d+(\.\d{2})?/g, "").trim();
    const productPrice = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    return { name: productName, price: productPrice };
}
