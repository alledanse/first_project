import { expect } from '@playwright/test';
import { Navigation } from './Navigation';
import { isDesktopViewport } from './../../utils/isDesktopViewport';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addToBasketButton = page.locator('[data-qa="product-button"]');
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }
  visit = async () => {
    await this.page.goto('/');
  };

  addProductsToBasket = async (numberOfProducts) => {
    const specificAddButton = this.addToBasketButton.nth(numberOfProducts);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText('Add to Basket');

    const navigation = new Navigation(this.page);

    //desktop only - mobile has no basket count
    let basketCountBeforeAdding;
    if (isDesktopViewport(this.page)) {
      basketCountBeforeAdding = await navigation.getBasketCount();
    }
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText('Remove from Basket');

    //desktop only - mobile has no basket count
    if (isDesktopViewport(this.page)) {
      const basketCountAfterAdding = await navigation.getBasketCount();
      expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
    const titlesBeforeSorting = await this.productTitle.allTextContents();
    await this.sortDropdown.selectOption('price-asc');
    const titlesAfterSorting = await this.productTitle.allTextContents();
    expect(titlesAfterSorting).not.toEqual(titlesBeforeSorting);
  };
}
