<script>
  import { count } from '$lib/stores/counter';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let itemDetail = {
    currentCost: 1,
    itemName: 'item name',
    upgradeLevel: 1
  };
  function formatCost(cost) {
    return `$${cost.toFixed(0)}`;
  }
</script>

<div class="upgrade-item">
  <div class="item-header">
    <h3 class="item-name">{itemDetail.itemName}</h3>
    <div>{formatCost(itemDetail.currentCost)}</div>
  </div>
  <div class="buttons">
    <button
      class="item-button"
      disabled={$count < itemDetail.currentCost}
      on:click={() => dispatch('increment')}
    >
      +
    </button>
  </div>
  <div class="item-info">
    <div>current level: {itemDetail.upgradeLevel}</div>
  </div>
</div>
