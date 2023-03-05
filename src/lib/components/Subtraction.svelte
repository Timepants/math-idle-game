<script>
  import { badCount } from "../stores/counter";
  import { getRandomInt } from "../utils/randomInt";
  import { badStart, start } from '../stores/ticker';

  /**
   * @type {number[]}
   */
  let subtrahends = [];

  let num_of_subtrahends = 2;

  let max_subtrahend_size = 500;

  let difference = 0;

  const reset_equation = () => {
    subtrahends = [];
    for (let index = 0; index < num_of_subtrahends; index++) {
      subtrahends.push(getRandomInt(max_subtrahend_size));
    }
    subtrahends.sort((a, b) => b - a);
  };

  reset_equation();

  const check_sum = () => {
    let temp_difference = 0;
    for (let index = 0; index < num_of_subtrahends; index++) {
      if (index === 0){
        temp_difference = subtrahends[index]
      } else {
        temp_difference -= subtrahends[index];
      }
    }
    if (temp_difference === difference) {
      badCount.decrement(difference);
    } else {
      alert(`bad subtract ${temp_difference}`);
      badStart.reset()
    }
    reset_equation();
  };
</script>

<button on:click={check_sum}>-</button>
{#each subtrahends as subtrahend}
  {subtrahend}-
{/each}
<input type="number" bind:value={difference} />
