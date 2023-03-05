<script>
  import { count } from "../stores/counter";
  import { getRandomInt } from "../utils/randomInt";
  import { start, badStart } from '../stores/ticker';

  /**
   * @type {number[]}
   */
  let addends = [];

  let num_of_addends = 5;

  let max_addend_size = 99;

  let sum = 0;

  const reset_equation = () => {
    
    addends = [];
    for (let index = 0; index < num_of_addends; index++) {
      addends.push(getRandomInt(max_addend_size));
    }
  };

  reset_equation();

  const check_sum = () => {
    let temp_sum = 0;
    addends.forEach((addend) => {
      temp_sum += addend;
    });
    if (temp_sum === sum) {
      count.increment(sum);
      start.reset();
    } else {
      alert(`bad add ${temp_sum}`);
      badStart.reset()
    }
    reset_equation();
    
  };
  const decrement = () => {
    count.decrement(2);
  };
</script>


<br>
{#each addends as addend}
    +{addend}
    <br>
{/each}
<button on:click={check_sum}>+</button><input type="number" bind:value={sum} />
<button on:click={decrement}>-</button>
<button on:click={count.reset}>reset</button>
