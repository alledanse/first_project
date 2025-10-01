import { expect } from '@playwright/test';

export class Checkout {
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoving = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const prices = await this.basketItemPrice.allTextContents();
    const justNumbers = prices.map((price) => {
      price.replace('$', '');
      return parseInt(price, 10);
    });
    const cheapestPrice = Math.min(...justNumbers);
    const indexOfCheapest = justNumbers.indexOf(cheapestPrice);
    const specificRemoveButton = this.basketItemRemoveButton.nth(indexOfCheapest);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoving - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/gm, { timeout: 5000 });
  };
}
