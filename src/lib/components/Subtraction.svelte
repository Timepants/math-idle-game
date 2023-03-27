<script>
  import { badCount } from '../stores/counter';
  import { getRandomInt } from '../utils/randomInt';
  import { numOfSubtrahends, maxSubtrahendSize } from '../stores/gameState';
  import { badStart, goodStart } from '../stores/ticker';
  import EquationAnswerBox from './EquationAnswerBox.svelte';

  /**
   * @type {number[]}
   */
  let subtrahends = [];

  let difference = 0;

  let answer = 0;

  const reset_equation = () => {
    subtrahends = [];
    for (let index = 0; index < $numOfSubtrahends; index++) {
      subtrahends.push(getRandomInt($maxSubtrahendSize));
    }
    if ($numOfSubtrahends <= 2) {
      subtrahends.sort((a, b) => b - a);
    }
    for (let index = 0; index < $numOfSubtrahends; index++) {
      answer = index === 0 ? subtrahends[index] : answer - subtrahends[index];
    }
  };

  reset_equation();

  const checkDifference = (
    /** @type {{ detail: { userAnswer: number; }; }} */ event
  ) => {
    if (answer === event.detail.userAnswer) {
      badCount.decrement(Math.abs(answer));
    } else {
      alert(`bad subtract ${answer}`);
      badStart.reset();
    }
    reset_equation();
  };
</script>

<div class="equation-container">
  <div class="addends">
    {#each subtrahends as subtrahend, index}
      {#if index !== 0}
        <span class="plus">-</span>
      {/if}
      <span class="addend">{subtrahend}</span>
    {/each}
  </div>
  <EquationAnswerBox on:checkAnswer={checkDifference} correctAnswer={answer} />
</div>

<style>
  .equation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .addends {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    font-size: 1.5rem;
    /* margin-bottom: 1rem; */
  }

  .plus {
    color: #333;
  }

  .addend {
    font-weight: bold;
    color: #333;
  }
</style>
