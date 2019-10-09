import { Store } from '../rootStore';
import { Cost, CostCategoryType, Item } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { observable } from 'mobx';
import { getDateNow } from '../../../components/dialogs/expensesDialogs/spendingsTable/costsCounter';

export class ShoppingClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable chosenItems: string[] = [];
  @observable count: number = 0;
  @observable date: Date = new Date();
  @observable category: CostCategoryType = 'bill';
  @observable info: string = '';
  @observable chosenCost: Cost = {
    count: 0,
    chosenItems: [],
    date: '',
    category: 'bill'
  };

  setChosenCost = (cost: Cost): Cost => (this.chosenCost = cost);

  addCost = (cost: Cost): void => {
    this.store.costs.unshift(cost);
    this.store.apiClient.addCostOnServer(cost);
  };

  addNewSpending = () => {
    let date: string = String(new Date().toLocaleString('en-GB')).slice(0, 10);

    const datePicked = this.store.calendarClient.getDatePicked();

    if (datePicked.length > 0) {
      date = String(datePicked);
    }
    const billCost: Cost = {
      chosenItems: this.chosenItems,
      count: this.count,
      date: date,
      category: this.category,
      info: this.info.length > 0 && this.info
    };

    if (billCost.chosenItems.length && billCost.count > 0) {
      this.store.costs.unshift(billCost);
      this.store.calendarClient.datePicked = '';
      this.store.apiClient.addCostOnServer(billCost);
      this.store.visibilityClient.setVisibleDialog();
    }
  };

  changeShoppingItems = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    this.chosenItems = target.value.split(',');
  };

  changeNewSpendingCategory = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;
    let chosenValue: CostCategoryType;

    if (target.value === 'Bill') {
      chosenValue = 'bill';
    } else if (target.value === 'Health care') {
      chosenValue = 'health';
    } else if (target.value === 'Car exploitation') {
      chosenValue = 'car';
    } else if (target.value === 'Other') {
      chosenValue = 'other';
    } else {
      chosenValue = 'shopping';
    }

    this.chosenItems[0] = chosenValue;
    this.category = chosenValue;
  };

  changeNewSpendingCounter = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    if (parseInt(target.value, 10) > 0) {
      this.count = parseInt(target.value, 10);
    } else {
      target.value = '0';
      this.count = 0;
    }
  };

  changeNewSpendingInfo = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    this.info = target.value;
  };

  finishShopping = (): void => {
    if (this.count < 1) {
      return;
    }

    const newSelected: Item[] = [];
    let newItems: Item[] = [];
    const chosenItems: string[] = [];
    newItems = this.store.items;

    this.store.selected.map((item: Item) => {
      if (item.checked) {
        newItems.push(item);
        chosenItems.push(item.name);
      } else {
        newSelected.push(item);
      }
    });

    const cost: Cost = {
      chosenItems: this.chosenItems,
      count: this.count,
      date: getDateNow(),
      category: 'shopping'
    };
    cost.count = Math.round(this.count);
    this.count = 0;
    cost.chosenItems = chosenItems;

    this.addCost(cost);
    sortItemsByName(newItems);
    this.store.itemManagerClient.reorderItems(newItems, newSelected);

    this.store.visibilityClient.setVisibleDialog();
  };
}
