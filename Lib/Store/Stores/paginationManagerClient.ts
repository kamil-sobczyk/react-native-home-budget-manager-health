import { Store } from '../rootStore';

import { observable } from 'mobx';

import { ListType, Item } from '../../interfaces';

export class PaginationManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable chosenPages = {
    items: 1,
    selected: 1
  };
  @observable maxPages = {
    items: this.store.items.length / 10,
    selected: this.store.selected.length / 10
  };

  private scrollToTop = (): void => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  setChosenPage = (list: ListType, page: number): void => {
    this.chosenPages[list] = page;
  };

  setNextPage = (list: ListType): void => {
    this.scrollToTop();
    this.chosenPages[list]++;
  };

  setPrevPage = (list: ListType): void => {
    this.scrollToTop();
    if (this.chosenPages[list] > 1) {
      this.chosenPages[list]--;
    }
  };

  getChosenPage = (list: ListType): number => this.chosenPages[list];

  getMaxPage = (list: ListType): number =>
    this.maxPages[list] > 0
      ? this.maxPages[list]
      : this.store.items.length / 10 - 1;

  setMaxPage = (list: ListType, items: Item[]): void => {
    if (items.length % 10 !== 0) {
      this.maxPages[list] = items.length / 10;
    } else {
      this.maxPages[list] = items.length / 10 - 10;
    }
  };
}
