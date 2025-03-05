import { Locator } from "playwright";

export async function clickElement(locator: Locator): Promise<void> {
    await locator.click();
}

export async function getInputValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
}
