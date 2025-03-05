import { getContactInformationData } from "../../../test-data/contact-information-data";
import { calculateTotalPrice } from "../../../utils/helpers/price-helpers";
import { test } from "../fixtures";

test.describe("Test Suite: Purchase flow", { tag: ["@Regression", "@UI"] }, () => {
    test("TC_01 Product Purchase", { tag: "@Smoke" }, async ({ shopPage, productPage, checkOutPage }) => {
        const { name, price } = await shopPage.selectRandomProduct();

        await productPage.verifyProductName(name);
        await productPage.verifyProductPrice(price);
        await productPage.clickButtonAddToBag();

        await productPage.verifyProductNameInsideCart(name);
        await productPage.verifyProductPriceInsideCart(price);
        await productPage.clickQuantityButton(2);

        const { unitPrice, priceWithoutShipping } = await productPage.verifyTotalPriceInsideCart();

        await productPage.clickCheckoutButton();

        await checkOutPage.selectShippingDestination();
        await checkOutPage.waitForPriceUpdate();

        const shippingPrice = await checkOutPage.selectDpdDelivery();

        await checkOutPage.selectRandomShippingAddress();
        await checkOutPage.waitForPriceUpdate();
        await checkOutPage.verifyUnitPriceInsideCheckout(unitPrice);
        await checkOutPage.verifySubTotalPriceInsideCheckout(priceWithoutShipping);
        await checkOutPage.verifyShippingPriceInsideCheckout(shippingPrice);

        const expectedTotalPrice = calculateTotalPrice(priceWithoutShipping, shippingPrice);

        await checkOutPage.verifyTotalPriceInside(expectedTotalPrice);
        await checkOutPage.clickContinueButton();

        const contactInformationData = getContactInformationData();

        await checkOutPage.fillInContactInformation(contactInformationData);
        await checkOutPage.clickContinueButton();
        await checkOutPage.clickPlaceAnOrderButton();

        await shopPage.verifythankYouForOrderMessage();
        await shopPage.clickGotItButton();
    });
});
