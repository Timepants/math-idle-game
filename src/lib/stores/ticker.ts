import { readable, derived, writable } from "svelte/store";
import { doTick } from "../utils/tickers";

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
    doTick();
  }, 50);

  return function stop() {
    clearInterval(interval);
  };
});

const createStart = () => {
  let t = new Date();
  t.setSeconds(t.getSeconds() - 6000);
  const { subscribe, set } = writable(t);

  return {
    subscribe,
    reset: () => set(new Date()),
  };
};

export const goodStart = createStart();

export const badStart = createStart();

export const goodElapsed = derived([time, goodStart], ([$time, $start]) =>
  Math.round(($time.getTime() - $start.getTime()) / 1000)
);

export const badElapsed = derived([time, badStart], ([$time, $badStart]) =>
  Math.round(($time.getTime() - $badStart.getTime()) / 1000)
);
