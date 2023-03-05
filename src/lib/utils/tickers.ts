import { count, badCount } from '../stores/counter';
import {get} from 'svelte/store'
import { elapsed, badElapsed } from '../stores/ticker';
export const doTick = () => {
    if (get(elapsed) < 2) {
        count.increment(100)
    } else if (get(elapsed) < 5) {
        count.increment(70)
    } else if (get(elapsed) < 9) {
        count.increment(30)
    } else if (get(elapsed) < 30) {
        count.increment(10)
    }
    

    if (get(badElapsed) < 2) {
        badCount.increment(0.5)
    } else {
        badCount.increment(0.04)
    } 
    
    

    if (get(badCount) > 75) {
        count.decrement(get(count)*0.5);
        badCount.reset();
    }
};
