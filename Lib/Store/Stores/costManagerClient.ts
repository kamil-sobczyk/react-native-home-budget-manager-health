import { Store } from '../rootStore';
import { Cost, Item } from '../../interfaces';

export class CostManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  private fixChosenItems = (cost: Cost): Cost => {
    let parsedCost = cost;

    if (parsedCost.category !== 'shopping') {
      parsedCost.chosenItems = [parsedCost.category];
    } else {
      parsedCost.chosenItems = parsedCost.chosenItems[0].split(', ');
    }

    return parsedCost;
  };

  deleteCost = (cost: Cost): void => {
    this.store.apiClient.deleteCostOnServer(this.fixChosenItems(cost));
    this.store.visibilityClient.setVisibleDialog();
  };

  editCost = (oldCost: Cost): void => {
    const {
      chosenItems,
      count,
      chosenCost,
      info,
      category
    } = this.store.shoppingClient;

    const newCost: Cost = {
      chosenItems: chosenItems.length ? chosenItems : chosenCost.chosenItems,
      count: count > 0 ? count : chosenCost.count,
      date:
        String(this.store.calendarClient.getDatePicked()).length > 0
          ? this.store.calendarClient.getDatePicked()
          : chosenCost.date,
      category: category,
      info: info.length > 0 ? info : chosenCost.info
    };

    this.store.apiClient.editCostOnServer(
      this.fixChosenItems(oldCost),
      newCost
    );
  };
}
