<script>
  import { count } from "../stores/counter";
  import { getRandomInt } from "../utils/randomInt";
  import { goodStart, badStart } from "../stores/ticker";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let correctAnswer = 0;

  let userAnswer = 0;

  function checkAnswer() {
    dispatch("checkAnswer", {
      userAnswer: userAnswer,
    });
  }
</script>

<br />
<button on:click={checkAnswer}>submit</button>
<input type="number" bind:value={userAnswer} />
{correctAnswer}
