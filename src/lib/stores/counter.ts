import { writable } from "svelte/store";

const createCount = () => {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: (amount: number) => update((n) => n + amount),
    decrement: (amount: number) =>
      update((n) => (n - amount >= 0 ? n - amount : 0)),
    reset: () => set(0),
  };
};

export const count = createCount();

export const badCount = createCount();
