import { Store } from '../rootStore';
import { Item, ListType } from '../../interfaces';

import { reorder, move, sortItemsByName } from '../../reorderFunctions';

import { DropResult, DragStart } from 'react-beautiful-dnd';
import { observable } from 'mobx';

export class DnDClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable draggedItemId: string = '';

  filterByCategory = (list: ListType) => {
    const { chosenCategories } = this.store.itemManagerClient;

    if (list === 'items') {
      if (chosenCategories.items === 'All' || chosenCategories.items === '') {
        return this.store.items;
      } else
        return this.store.items.filter(
          (item: Item) => item.category === chosenCategories.items
        );
    } else {
      if (
        chosenCategories.selected === 'All' ||
        chosenCategories.selected === ''
      ) {
        return this.store.selected;
      } else
        return this.store.selected.filter(
          (item: Item) => item.category === chosenCategories.selected
        );
    }
  };

  private getDndList = (id: string): Item[] => {
    if (id === 'droppable2') {
      return this.store.items;
    } else {
      return this.store.selected;
    }
  };

  private reorderList = (list: string, reorderedList: Item[]): void => {
    if (list === 'droppable') {
      this.store.selected = reorderedList;
    } else {
      this.store.items = reorderedList;
    }
  };

  onDragStart = (start: DragStart) => {
    this.draggedItemId = start.draggableId;
  };

  onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;
    const { reorderItemsOnServer } = this.store.apiClient;
    const sourceListName =
      source.droppableId === 'droppable2' ? 'items' : 'selected';

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getDndList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId !== 'droppable2') {
        this.reorderList(destination.droppableId, items);
        reorderItemsOnServer(this.store.items, this.store.selected);
      }
    } else {
      const result = move(
        this.getDndList(source.droppableId),
        this.getDndList(destination.droppableId),
        source,
        destination,
        this.store.itemManagerClient.getIndexById(
          sourceListName,
          this.draggedItemId
        )
      );

      result.droppable2.map((item: Item): boolean => (item.checked = false));

      this.store.selected = result.droppable;
      this.store.items = sortItemsByName(result.droppable2);
      reorderItemsOnServer(this.store.items, this.store.selected);
    }
  };
}
