import {Store, StoreProps} from "../RootStore";
import {store} from "../RootStore";
import {observable, action} from "mobx";
import axios from "axios";
import {apiKey, appID} from "../../config";
import {createObservableArray} from "mobx/lib/internal";

enum route {
  INSTANT = "/search/instant/",
  NUTRIENS = "/natural/nutrients"
}

export interface Item {
  name: string;
  kcal: number;
  lactose: number;
  carbohydrate: number;
}

export interface Nutrient {
  attr_id: number;
  value: number;
}

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  private readonly headers = {
    "x-app-id": appID,
    "x-app-key": apiKey
  };
  private searchPhrase: string = "corn";
  private item: Item = {name: "", kcal: 0, lactose: 0, carbohydrate: 0};
  private isSearchedForNutriens: boolean = false;
  private isSearchDetailed: boolean = true;
  private maxResults: number = 1;
  private offset: number = 0;
  private baseURL: string = "https://trackapi.nutritionix.com/v2";
  private searchParams: string = `&self=true&branded=false&common=true&detailed=${this.isSearchDetailed}`;
  private apiURL = `${this.baseURL}${
    this.isSearchedForNutriens ? route.NUTRIENS : route.INSTANT
  }?query=${this.searchPhrase}${!this.isSearchedForNutriens &&
    this.searchParams}`;
  private data = undefined;

  @action setSearchPhrase = (phrase: string) => (this.searchPhrase = phrase);
  @action getSearchPhrase = () => this.searchPhrase;
  @action getFoundData = () => this.data;
  @action setItemName = (name: string) => (this.item.name = name);
  @action setItemKcal = (amount: number) => {
    if (amount[0]) {
      this.item.kcal = amount[0].value;
    }
  };
  @action setItemLactose = (amount: number) => {
    if (amount[0]) {
      this.item.lactose = amount[0].value;
    }
  };
  @action setItemCarbohydrate = (amount: number) => {
    if (amount[0]) {
      this.item.carbohydrate = amount[0].value;
    }
  };
  @action setFoundItem = data => {
    const {full_nutrients: nutrients} = data;
    this.setItemName(data.food_name);

    nutrients.map((nutrient: Nutrient) => {
      const {attr_id: id, value} = nutrient;
      if (id === 208) this.setItemKcal(value);
      if (id === 213) this.setItemLactose(value);
      if (id === 208) this.setItemCarbohydrate(value);
    });

    this.setItemLactose(
      nutrients.filter((nutrien: Nutrient) => nutrien.attr_id === 213)
    );
    this.setItemKcal(
      nutrients.filter((nutrien: Nutrient) => nutrien.attr_id === 208)
    );
    this.setItemCarbohydrate(
      nutrients.filter((nutrien: Nutrient) => nutrien.attr_id === 205)
    );
  };
  @action getItemData = () => this.item;

  getSearchData = async (): Promise<any> =>
    await axios({
      method: "get",
      url: this.apiURL,
      headers: this.headers
    }).then(res => {
      this.setFoundItem(res.data.common[0]);
    });
}
