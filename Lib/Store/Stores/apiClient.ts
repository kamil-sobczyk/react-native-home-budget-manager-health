import axios from 'axios';

import { server } from '../../../../config';

import { Store } from '../rootStore';

import { Item, ListType, Cost, Income } from '../../interfaces';
import { observable } from 'mobx';

// const server = 'http://localhost:8081/';

export const sortCostsOrIncomes = (
  costs: Cost[] | Income[]
): Cost[] | Income[] =>
  costs
    .sort((a: Cost | Income, b: Cost | Income): number => {
      const aDateParts = a.date.split('/');
      const bDateParts = b.date.split('/');

      const aDateObject = new Date(
        `${aDateParts[1]}/${aDateParts[0]}/${aDateParts[2]}`
      );
      const bDateObject = new Date(
        `${bDateParts[1]}/${bDateParts[0]}/${bDateParts[2]}`
      );

      return aDateObject > bDateObject ? -1 : aDateObject < bDateObject ? 1 : 0;
    })
    .reverse();

interface Headers {
  token: string;
  id: string;
}

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable private headers: Headers = {
    token: localStorage.googleToken || '',
    id: localStorage.id || ''
  };

  setUser = (token: string, id: string): void => {
    let usr = id;
    if (usr === '106261623878731601808') {
      usr = '102234771401894238200';
    }

    localStorage.googleToken = token;
    localStorage.id = usr;

    this.headers.token = token;
    this.headers.id = usr;
  };

  getItems = async (): Promise<Item[]> =>
    await axios({
      method: 'get',
      url: server + 'store/items',
      headers: this.headers
    }).then(items => (this.store.items = items.data as Item[]));

  getSelected = async (): Promise<Item[]> =>
    await axios({
      method: 'get',
      url: server + 'store/selected',
      headers: this.headers
    }).then(selected => (this.store.selected = selected.data as Item[]));

  getCosts = async (): Promise<Cost[]> =>
    await axios({
      method: 'get',
      url: server + 'store/costs',
      headers: this.headers
    }).then(
      costs =>
        (this.store.costs = sortCostsOrIncomes(costs.data).reverse() as Cost[])
    );

  getIncomes = async (): Promise<Income[]> =>
    await axios({
      method: 'get',
      url: server + 'store/incomes',
      headers: this.headers
    }).then(incomes => (this.store.incomes = incomes.data as Income[]));

  deleteItemOnServer = async (name: string, info: string): Promise<void> => {
    await axios({
      method: 'delete',
      url: server + 'store/items',
      headers: this.headers,
      data: { name, info }
    });
  };

  editItemOnServer = async (
    list: ListType,
    oldItem: Item,
    newItem: Item
  ): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/' + list,
      headers: this.headers,
      data: { oldItem, newItem }
    });
  };

  reorderItemsOnServer = async (
    items: Item[],
    selected: Item[]
  ): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/',
      headers: this.headers,
      data: { items, selected }
    });
  };

  addCostOnServer = async (cost: Cost): Promise<void> => {
    await axios({
      method: 'post',
      url: server + 'store/costs',
      headers: this.headers,
      data: { cost }
    });
  };

  checkItemOnServer = async (item: Item): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/checked',
      headers: this.headers,
      data: { item }
    });
  };

  addShoppingItemOnServer = async (item: Item): Promise<void> => {
    await axios({
      method: 'post',
      url: server + 'store/items',
      headers: this.headers,
      data: { item }
    });
  };

  deleteCostOnServer = async (cost: Cost): Promise<void> => {
    await axios({
      method: 'delete',
      url: server + 'store/costs',
      headers: this.headers,
      data: { cost }
    });
  };

  editCostOnServer = async (oldCost: Cost, newCost: Cost): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/costs',
      headers: this.headers,
      data: { oldCost, newCost }
    });
  };

  addNewIncome = async (income: Income): Promise<void> => {
    await axios({
      method: 'post',
      url: server + 'store/incomes',
      headers: this.headers,
      data: { income }
    });
  };

  deleteIncome = async (income: Income): Promise<void> => {
    await axios({
      method: 'delete',
      url: server + 'store/incomes',
      headers: this.headers,
      data: { income }
    });
  };
}
