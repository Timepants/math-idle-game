<script>
  import { count } from "../stores/counter";
  import { numOfAddends, maxAddendSize } from "../stores/gameState";
  import { getRandomInt } from "../utils/randomInt";
  import { goodStart, badStart } from "../stores/ticker";
  import EquationAnswerBox from "./EquationAnswerBox.svelte";

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

<br />
{#each addends as addend}
  +{addend}
  <br />
{/each}
<EquationAnswerBox on:checkAnswer={checkSum} {correctAnswer} />
