import { readable, derived, writable } from 'svelte/store';
import { doTick } from '../utils/tickers';

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
		reset: () => set(new Date())
	};
}

export const start = createStart();

export const badStart = createStart();

export const elapsed = derived(
	[time, start],
	([$time, $start]) => Math.round(($time.getTime() - $start.getTime()) / 1000)
);

export const badElapsed = derived(
	[time, badStart],
	([$time, $badStart]) => Math.round(($time.getTime() - $badStart.getTime()) / 1000)
);