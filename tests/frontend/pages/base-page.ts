import { Page } from "@playwright/test";
import environment from "../../../environment";

export default class BasePage {
    readonly page: Page;
    readonly baseUrl = environment.baseUrl;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(urlPath?: string): Promise<void> {
        await this.page.goto(`${this.baseUrl}${urlPath ? urlPath : ""}`);
    }
}
