import { Locator, Page } from "@playwright/test";
import { CommonAssertions } from "../assertions/common-assertions";
import { getNumericValueFromText } from "../../../utils/helpers/price-helpers";
import { clickElement } from "../../../utils/helpers/common-helpers";
import { ElementRole } from "../../../utils/enum/locators-enum";
import { ContactInformationData } from "../../../test-data/contact-information-data";
import { ElementName } from "../../../utils/enum/element-names-enum";

export class CheckOutPage extends CommonAssertions {
    override readonly page: Page;
    readonly unitPrice: Locator;
    readonly subTotalPrice: Locator;
    readonly shippingPrice: Locator;
    readonly totalPrice: Locator;
    readonly dpdDeliveryOption: Locator;
    readonly dpdDeliveryPrice: Locator;
    readonly shippingAddressDropdownTrigger: Locator;
    readonly shippingLocationList: Locator;
    readonly continueButton: Locator;
    readonly emailTextbox: Locator;
    readonly fullNameTextbox: Locator;
    readonly phoneNumberTextbox: Locator;
    readonly commentTextbox: Locator;
    readonly placeAnOrderButton: Locator;
    readonly shippingDestinationDropdownTrigger: Locator;
    readonly destinationCountryLithuania: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.unitPrice = page.locator("div[class='text-caption font-weight-medium text-grey700']");
        this.subTotalPrice = page.locator("div[data-qa='checkout-cartsummary-subtotalprice-value']");
        this.shippingPrice = page.locator("div[class='v-col text-right']");
        this.totalPrice = page.locator(".v-col.text-right.font-size-16.py-2");
        this.dpdDeliveryOption = page.getByText("DPD pickup");
        this.dpdDeliveryPrice = page.getByRole(ElementRole.RadioGroup).getByText("€2.90");
        this.shippingAddressDropdownTrigger = page.getByRole(ElementRole.RadioGroup).getByLabel("Open");
        this.shippingLocationList = page.locator(".v-list-item");
        this.continueButton = page.getByRole(ElementRole.Button, { name: ElementName.ContinueButton });
        this.emailTextbox = page.getByRole(ElementRole.TextBox, { name: ElementName.EmailTextbox });
        this.fullNameTextbox = page.getByRole(ElementRole.TextBox, { name: ElementName.FullNameTextbox });
        this.phoneNumberTextbox = page.getByPlaceholder(ElementName.PhoneNumberTextbox);
        this.commentTextbox = page.getByRole(ElementRole.TextBox, { name: ElementName.CommentTextbox });
        this.placeAnOrderButton = page.getByRole(ElementRole.Button, { name: ElementName.PlaceAnOrderButton });
        this.shippingDestinationDropdownTrigger = page.locator(".v-field__append-inner").first();
        this.destinationCountryLithuania = page.getByRole(ElementRole.Option, { name: ElementName.Lithuania });
    }

    async selectDpdDelivery(): Promise<number> {
        await clickElement(this.dpdDeliveryOption);
        const shippingPrice = await getNumericValueFromText(this.dpdDeliveryPrice);
        return shippingPrice;
    }

    async selectShippingDestination() {
        await clickElement(this.shippingDestinationDropdownTrigger);
        await clickElement(this.destinationCountryLithuania);
    }

    async clickContinueButton() {
        await clickElement(this.continueButton);
    }

    async clickPlaceAnOrderButton() {
        await clickElement(this.placeAnOrderButton);
    }

    async fillInContactInformation(contactInformationData: ContactInformationData) {
        await this.emailTextbox.fill(contactInformationData.email);
        await this.fullNameTextbox.fill(contactInformationData.fullName);
        await this.phoneNumberTextbox.fill(contactInformationData.phoneNumber);
        await this.commentTextbox.fill(contactInformationData.comment);
    }

    async selectRandomShippingAddress() {
        await clickElement(this.shippingAddressDropdownTrigger);
        const listItems = this.shippingLocationList;
        const count = await listItems.count();
        const randomIndex = Math.floor(Math.random() * count);
        await listItems.nth(randomIndex).click();
        await this.page.waitForLoadState("networkidle");
    }

    async waitForPriceUpdate() {
        await this.page.waitForTimeout(2000);
    }
}
