<script>
  import { createEventDispatcher } from 'svelte';
  import { count } from '$lib/stores/counter';
  const dispatch = createEventDispatcher();

  export let itemDetail = {
    currentCost: 1,
    activeUpgradeLevel: 1,
    upgradeLevel: 1
  };
</script>

lookup itemname
<button
  disabled={$count < itemDetail.currentCost &&
    itemDetail.upgradeLevel === itemDetail.activeUpgradeLevel}
  on:click={() => dispatch('increment')}>+</button
>
<button
  disabled={0 >= itemDetail.activeUpgradeLevel}
  on:click={() => dispatch('decrement')}>-</button
>
{JSON.stringify(itemDetail)}
