import { expect } from '@playwright/test';

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder('Discount code');
    this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]');
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountedValue = page.locator('[data-qa="total-with-discount-value"]');
    this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
    this.creditCardOwnerInput = page.getByPlaceholder('Credit card owner');
    this.creditCardNumberInput = page.getByPlaceholder('Credit card number');
    this.creditCardVaildUntilInput = page.getByPlaceholder('Valid until');
    this.creditCardCVCInput = page.getByPlaceholder('Credit card CVC');
    this.paymentButton = page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.textContent();
    await this.discountInput.waitFor();
    await this.discountInput.fill(code);
    expect(await this.discountInput).toHaveValue(code);
  };

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(paymentDetails.owner);
    await this.creditCardNumberInput.waitFor();
    await this.creditCardNumberInput.fill(paymentDetails.cardNumber);
    await this.creditCardVaildUntilInput.waitFor();
    await this.creditCardVaildUntilInput.fill(paymentDetails.expDate);
    await this.creditCardCVCInput.waitFor();
    await this.creditCardCVCInput.fill(paymentDetails.cvc);
  };

  completePayment = async () => {
    await this.paymentButton.waitFor();
    await this.paymentButton.click();
    await this.page.waitForURL(/\/thank-you/gm, { timeout: 5000 });
  };
}
