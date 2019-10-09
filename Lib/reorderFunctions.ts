import { Item, ListType } from './interfaces';

interface DroppablePlace {
  index: number;
  droppableId: string;
}

export const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: DroppablePlace,
  droppableDestination: DroppablePlace,
  draggedItemIndex: number
) => {

  const result: { [key: string]: Item[] } = {};
    let sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  let removed = sourceClone[draggedItemIndex];

  destClone.splice(droppableDestination.index, 0, removed);

  sourceClone = sourceClone.filter((item: Item) => {
    let ret: boolean = true;

    destClone.map((element: Item) => {
      if (element === item) {
        ret = false;
      }
    });

    return ret;
  });

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const sortItemsByName = (items: Item[]): Item[] =>
  items
    .slice()
    .sort((a: Item, b: Item): number => a.name.localeCompare(b.name));

export const removeDuplicates = (items: Item[]) =>
  items.filter((item: Item, index: number) => items.indexOf(item) === index);
