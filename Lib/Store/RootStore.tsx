import {action, observable} from "mobx";
import {ScreenManager} from "./Stores/ScreenManager";
import {DataManager} from "./Stores/DataManager";
import {ApiClient} from "./Stores/ApiClient";

export class Store {
  screenController: ScreenManager;
  dataManager: DataManager;
  apiClient: ApiClient;

  constructor() {
    this.screenController = new ScreenManager(this);
    this.dataManager = new DataManager(this);
    this.apiClient = new ApiClient(this);
  }

  @observable text = "helloo";

  @action setText(value: string): void {
    this.text = value;
  }
}

export const store = new Store();

export interface StoreProps {
  store: Store;
}
