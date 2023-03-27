import { count } from '$lib/stores/counter';

export interface IItemAvailableAfterDetail {
  itemId: string;
  upgradeLevel: number;
}

export interface IItemDetail {
  itemName: string;
  isAvailable: boolean;
  type: string;
  availableAfter: IItemAvailableAfterDetail;
  itemType: string;
  upgradeLevel: number;
  activeUpgradeLevel: number;
  forced?: boolean;
  currentCost: number;
  currentGoodTicker: number;
  currentBadTicker: number;
  currentAdditionNumMod: number;
  currentAdditionSizeMod: number;
  IncFunc: (item: IItemDetail) => IItemDetail;
  DecFunc: (item: IItemDetail) => IItemDetail;
}

export interface IItems {
  [key: string]: IItemDetail;
}

const standard_inc_func = (
  factor_good: number,
  factor_bad: number,
  factor_cost: number,
  item: IItemDetail
) => {
  if (item.activeUpgradeLevel === item.upgradeLevel) {
    count.decrement(item.currentCost);
  }
  return {
    ...item,
    activeUpgradeLevel: item.activeUpgradeLevel + 1,
    upgradeLevel:
      item.activeUpgradeLevel === item.upgradeLevel
        ? item.upgradeLevel + 1
        : item.upgradeLevel,
    currentCost:
      item.upgradeLevel > 0
        ? item.currentCost + item.currentCost * factor_cost
        : item.currentCost,
    currentGoodTicker:
      item.upgradeLevel > 0
        ? item.currentGoodTicker + item.currentGoodTicker * factor_good
        : item.currentGoodTicker,
    currentBadTicker:
      item.upgradeLevel > 0
        ? item.currentBadTicker + item.currentBadTicker * factor_bad
        : item.currentBadTicker
  };
};

const addition_inc_func = (
  factor_size: number,
  factor_num: number,
  factor_cost: number,
  item: IItemDetail
) => {
  if (item.activeUpgradeLevel === item.upgradeLevel) {
    count.decrement(item.currentCost);
  }
  return {
    ...item,
    activeUpgradeLevel: item.activeUpgradeLevel + 1,
    upgradeLevel:
      item.activeUpgradeLevel === item.upgradeLevel
        ? item.upgradeLevel + 1
        : item.upgradeLevel,
    currentCost:
      item.activeUpgradeLevel === item.upgradeLevel && item.upgradeLevel > 0
        ? item.currentCost + item.currentCost * factor_cost
        : item.currentCost,
    currentAdditionNumMod:
      item.upgradeLevel > 0
        ? item.currentAdditionNumMod + factor_num
        : item.currentAdditionNumMod,
    currentAdditionSizeMod:
      item.upgradeLevel > 0
        ? item.currentAdditionSizeMod + factor_size
        : item.currentAdditionSizeMod
  };
};

const addition_dec_func = (
  factor_size: number,
  factor_num: number,
  item: IItemDetail
) => {
  if (item.activeUpgradeLevel === item.upgradeLevel) {
    count.decrement(item.currentCost);
  }
  return {
    ...item,
    activeUpgradeLevel: item.activeUpgradeLevel - 1,
    currentAdditionNumMod:
      item.activeUpgradeLevel > 0
        ? item.currentAdditionNumMod - factor_num
        : item.currentAdditionNumMod,
    currentAdditionSizeMod: item.currentAdditionSizeMod - factor_size
  };
};

export const itemsDefaults: IItems = {
  additionStart: {
    itemName: 'creates addition',
    type: 'hidden',
    isAvailable: true,
    availableAfter: { itemId: 'start', upgradeLevel: 0 },
    itemType: 'iteratable',
    upgradeLevel: 1,
    activeUpgradeLevel: 1,
    forced: false,
    currentCost: 0,
    currentGoodTicker: 0,
    currentBadTicker: 0,
    currentAdditionNumMod: 10,
    currentAdditionSizeMod: 2,
    IncFunc: (item) => item,
    DecFunc: (item) => item
  },
  badStart: {
    itemName: 'creates something',
    type: 'hidden',
    isAvailable: false,
    availableAfter: { itemId: 'test2', upgradeLevel: 1 },
    itemType: 'iteratable',
    upgradeLevel: 0,
    activeUpgradeLevel: 0,
    forced: true,
    currentCost: 0,
    currentGoodTicker: 0,
    currentBadTicker: 0.02,
    currentAdditionNumMod: 0,
    currentAdditionSizeMod: 0,
    IncFunc: (item) => item,
    DecFunc: (item) => item
  },
  test1: {
    itemName: 'This one gives you automatic good ticker',
    type: 'plus',
    isAvailable: true,
    availableAfter: { itemId: 'start', upgradeLevel: 0 },
    itemType: 'iteratable',
    upgradeLevel: 0,
    activeUpgradeLevel: 0,
    forced: false,
    currentCost: 1,
    currentGoodTicker: 0,
    currentBadTicker: 0,
    currentAdditionNumMod: 0,
    currentAdditionSizeMod: 0,
    IncFunc: (item) => standard_inc_func(0.009, 0.002, 0.5, item),
    DecFunc: (item) => item
  },
  test2: {
    itemName: 'This gives you bigger numbers to add',
    type: 'plus_minus',
    isAvailable: true,
    availableAfter: { itemId: 'test1', upgradeLevel: 1 },
    itemType: 'iteratable',
    upgradeLevel: 0,
    activeUpgradeLevel: 0,
    forced: false,
    currentCost: 1,
    currentGoodTicker: 0,
    currentAdditionNumMod: 20,
    currentAdditionSizeMod: 0,
    currentBadTicker: 0,
    IncFunc: (item) => addition_inc_func(0, 20, 0.5, item),
    DecFunc: (item) => addition_dec_func(0, 20, item)
  },
  test3: {
    itemName: 'This gives you more numbers to add',
    type: 'plus_minus',
    isAvailable: false,
    availableAfter: { itemId: 'test2', upgradeLevel: 10 },
    itemType: 'iteratable',
    upgradeLevel: 0,
    activeUpgradeLevel: 0,
    forced: false,
    currentCost: 1000,
    currentGoodTicker: 0,
    currentAdditionNumMod: 0,
    currentAdditionSizeMod: 1,
    currentBadTicker: 0,
    IncFunc: (item) => addition_inc_func(1, 0, 3, item),
    DecFunc: (item) => addition_dec_func(1, 0, item)
  },
  test4: {
    itemName: 'This one gives you automatic good ticker, but more',
    type: 'plus',
    isAvailable: false,
    availableAfter: { itemId: 'test2', upgradeLevel: 1 },
    itemType: 'iteratable',
    upgradeLevel: 0,
    activeUpgradeLevel: 0,
    forced: false,
    currentCost: 20,
    currentGoodTicker: 0.009,
    currentBadTicker: 0.002,
    currentAdditionNumMod: 0,
    currentAdditionSizeMod: 0,
    IncFunc: (item) => standard_inc_func(0.01, 0.004, 0.7, item),
    DecFunc: (item) => item
  }
};
