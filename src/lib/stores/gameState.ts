import { derived, writable } from 'svelte/store';
import { itemsStore } from './items';

const createStore = (defaultValue: number) => {
  const { subscribe, set, update } = writable(defaultValue);

  return {
    subscribe,
    set: set,
    reset: () => set(defaultValue)
  };
};

export const numOfAddends = derived([itemsStore], ([$itemsStore]) => {
  let endValue = 0;
  for (const [key, value] of Object.entries($itemsStore)) {
    endValue +=
      value.currentAdditionSizeMod && value.activeUpgradeLevel > 0
        ? value.currentAdditionSizeMod
        : 0;
  }
  return endValue;
});

export const maxAddendSize = derived([itemsStore], ([$itemsStore]) => {
  let endValue = 0;
  for (const [key, value] of Object.entries($itemsStore)) {
    endValue +=
      value.currentAdditionNumMod && value.activeUpgradeLevel > 0
        ? value.currentAdditionNumMod
        : 0;
  }
  return endValue;
});
export const numOfSubtrahends = createStore(2);
export const maxSubtrahendSize = createStore(10);
// export const badTickerScale = createStore(1);
// export const goodTickerScale = createStore(1);

export const goodTickerScale = derived([itemsStore], ([$itemsStore]) => {
  let endValue = 0;
  for (const [key, value] of Object.entries($itemsStore)) {
    endValue +=
      value.currentGoodTicker && value.activeUpgradeLevel > 0
        ? value.currentGoodTicker
        : 0;
  }
  return endValue;
});

export const badTickerScale = derived([itemsStore], ([$itemsStore]) => {
  let endValue = 0;
  for (const [key, value] of Object.entries($itemsStore)) {
    endValue +=
      value.currentBadTicker && value.activeUpgradeLevel > 0
        ? value.currentBadTicker
        : 0;
  }
  return endValue;
});
