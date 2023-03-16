<script>
  import { count } from '$lib/stores/counter';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let itemDetail = { currentCost: 1 };
</script>

lookup itemname

<button
  disabled={$count < itemDetail.currentCost}
  on:click={() => dispatch('increment')}>+</button
>
{JSON.stringify(itemDetail)}
