import { expect } from '@playwright/test';

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.addressInput = page.locator('[data-qa="delivery-address-street"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.postalCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.countrySelect = page.locator('[data-qa="country-dropdown"]');

    this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
    this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]');
    this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressPostalCode = page.locator('[data-qa="saved-address-postcode"]');
    this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');

    this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
  }

  fillDetails = async (userAddress) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(userAddress.firstName);

    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(userAddress.lastName);

    await this.addressInput.waitFor();
    await this.addressInput.fill(userAddress.address);

    await this.cityInput.waitFor();
    await this.cityInput.fill(userAddress.city);

    await this.postalCodeInput.waitFor();
    await this.postalCodeInput.fill(userAddress.postalCode);

    await this.countrySelect.waitFor();
    await this.countrySelect.selectOption(userAddress.country);
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.saveAddressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1);

    await this.savedAddressFirstName.first().waitFor();
    expect(await this.savedAddressFirstName.first().textContent()).toBe(
      await this.firstNameInput.inputValue(),
    );
    await this.savedAddressLastName.first().waitFor();
    expect(await this.savedAddressLastName.first().textContent()).toBe(
      await this.lastNameInput.inputValue(),
    );
    await this.savedAddressStreet.first().waitFor();
    expect(await this.savedAddressStreet.first().textContent()).toBe(
      await this.addressInput.inputValue(),
    );
    await this.savedAddressPostalCode.first().waitFor();
    expect(await this.savedAddressPostalCode.first().textContent()).toBe(
      await this.postalCodeInput.inputValue(),
    );
    await this.savedAddressCountry.first().waitFor();
    expect(await this.savedAddressCountry.first().textContent()).toBe(
      await this.countrySelect.inputValue(),
    );
  };

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/gm, { timeout: 6000 });
  };
}
