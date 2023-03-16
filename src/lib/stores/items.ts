import { itemsDefaults, type IItems } from '$lib/items/items';
import { writable } from 'svelte/store';

const checkIfNewItemAvailable = (items: IItems, itemId: string) => {
  const new_items = { ...items };

  const items_updated = [];
  for (const item in items) {
    if (
      !items[item].isAvailable &&
      items[item].availableAfter !== undefined &&
      items[item].availableAfter.itemId &&
      items[item].availableAfter.itemId === itemId &&
      items[item].availableAfter.upgradeLevel === items[itemId].upgradeLevel
    ) {
      items_updated.push(item);
      new_items[item] = {
        ...items[item],
        isAvailable: true,
        upgradeLevel: items[item].forced === true ? 1 : 0,
        activeUpgradeLevel: items[item].forced === true ? 1 : 0
      };
    }
  }
  let new_new_item = { ...new_items };

  items_updated.forEach((item_updated) => {
    new_new_item = checkIfNewItemAvailable(new_new_item, item_updated);
  });

  return new_new_item;
};

const incrementItem = (items: IItems, itemId: string) => {
  console.log('update item');
  const updated_items = {
    ...items,
    [itemId]: {
      ...items[itemId].IncFunc(items[itemId])
    }
  };
  const updated_items_based_on_new_available = checkIfNewItemAvailable(
    updated_items,
    itemId
  );
  return updated_items_based_on_new_available;
};

const decrementItem = (items: IItems, itemId: string) => {
  console.log('dec item');
  const updated_items = {
    ...items,
    [itemId]: {
      ...items[itemId].DecFunc(items[itemId])
    }
  };
  return updated_items;
};

const createItems = () => {
  const { subscribe, set, update } = writable(itemsDefaults);

  return {
    subscribe,
    increment: (itemId: string) =>
      update((items) => incrementItem(items, itemId)),
    decrement: (itemId: string) =>
      update((items) => decrementItem(items, itemId)),
    reset: () => set(itemsDefaults)
  };
};

export const itemsStore = createItems();
