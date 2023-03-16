<script>
  import { badCount } from "../stores/counter";
  import { getRandomInt } from "../utils/randomInt";
  import { numOfSubtrahends, maxSubtrahendSize } from "../stores/gameState";
  import { badStart, goodStart } from "../stores/ticker";
  import EquationAnswerBox from "./EquationAnswerBox.svelte";

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
    console.log(event, answer);
    if (answer === event.detail.userAnswer) {
      badCount.decrement(Math.abs(answer));
    } else {
      alert(`bad subtract ${answer}`);
      badStart.reset();
    }
    reset_equation();
  };
</script>

{#each subtrahends as subtrahend}
  {subtrahend}-
  <br />
{/each}
<EquationAnswerBox on:checkAnswer={checkDifference} correctAnswer={answer} />
