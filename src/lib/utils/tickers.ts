import { count, badCount } from '../stores/counter';
import { get } from 'svelte/store';
import { goodElapsed, badElapsed } from '../stores/ticker';
import { badTickerScale, goodTickerScale } from '../stores/gameState';

export const doTick = () => {
  let elapsedValue = get(goodElapsed);
  let goodTickerScaleValue = get(goodTickerScale);
  let maxElapsedValue = 15;

  if (elapsedValue < maxElapsedValue) {
    // console.log(
    //   (maxElapsedValue - elapsedValue) * 0.002 * goodTickerScaleValue
    // );
    count.increment((maxElapsedValue - elapsedValue) * goodTickerScaleValue);
  }

  //   if (elapsedValue < 1) {
  //     console.log("do it");
  //     count.increment(0.1);
  //   } else if (elapsedValue < 2) {
  //     count.increment(0.07);
  //   } else if (elapsedValue < 9) {
  //     count.increment(0.0001);
  //   } else if (elapsedValue < 30) {
  //     count.increment(0.0001);
  //   }

  let badElapsedValue = get(badElapsed);
  let badElapsedValueFaultScale = 10;
  let maxBadElapsedValue = 2;
  let badTickerScaleValue = get(badTickerScale);

  if (badElapsedValue < maxBadElapsedValue) {
    badCount.increment(badTickerScaleValue * badElapsedValueFaultScale);
  } else {
    badCount.increment(badTickerScaleValue);
  }
  let maxBadResetValue = 75;
  if (get(badCount) > maxBadResetValue) {
    count.decrement(get(count) * 0.5);
    badCount.reset();
  }
};
