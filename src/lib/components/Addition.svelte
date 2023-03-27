<script>
  import { count } from '../stores/counter';
  import { numOfAddends, maxAddendSize } from '../stores/gameState';
  import { getRandomInt } from '../utils/randomInt';
  import { goodStart, badStart } from '../stores/ticker';
  import EquationAnswerBox from './EquationAnswerBox.svelte';

  /**
   * @type {number[]}
   */
  let addends = [];

  let correctAnswer = 0;

  const reset_equation = () => {
    correctAnswer = 0;
    addends = [];
    for (let index = 0; index < $numOfAddends; index++) {
      let random = getRandomInt($maxAddendSize);
      correctAnswer += random;
      addends.push(random);
    }
  };

  reset_equation();

  const checkSum = (
    /** @type {{ detail: { userAnswer: number; }; }} */ event
  ) => {
    if (correctAnswer === event.detail.userAnswer) {
      count.increment(correctAnswer);
      goodStart.reset();
    } else {
      alert(`bad add ${correctAnswer}`);
      badStart.reset();
    }
    reset_equation();
  };
</script>

<div class="equation-container">
  <div class="addends">
    {#each addends as addend, index}
      {#if index !== 0}
        <span class="plus">+</span>
      {/if}
      <span class="addend">{addend}</span>
    {/each}
  </div>
  <EquationAnswerBox on:checkAnswer={checkSum} {correctAnswer} />
</div>

<style>
  .equation-container {
    font-family: 'Chalkboard SE', 'Marker Felt', 'Comic Sans MS', cursive;
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
