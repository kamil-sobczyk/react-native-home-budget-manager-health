import {Store, StoreProps} from "../RootStore";
import {store} from "../RootStore";

interface Meal {
  date: string;
  items: string[];
}

interface UserData {
  meals: Meal[];
}

export class DataManager {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  userData: UserData;
}
