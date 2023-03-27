<script>
  import { createEventDispatcher } from 'svelte';
  import { count } from '$lib/stores/counter';
  const dispatch = createEventDispatcher();

  export let itemDetail = {
    currentCost: 1,
    activeUpgradeLevel: 1,
    upgradeLevel: 1,
    itemName: 'item name'
  };

  // Helper function to format number
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
      disabled={$count < itemDetail.currentCost &&
        itemDetail.upgradeLevel === itemDetail.activeUpgradeLevel}
      on:click={() => dispatch('increment')}
    >
      +
    </button>
    <button
      class="item-button"
      disabled={0 >= itemDetail.activeUpgradeLevel}
      on:click={() => dispatch('decrement')}
    >
      -
    </button>
  </div>
  <div class="item-info">
    <div>current level: {itemDetail.activeUpgradeLevel}</div>
    {itemDetail.upgradeLevel > itemDetail.activeUpgradeLevel
      ? `availible level: ${itemDetail.upgradeLevel}`
      : ''}
  </div>
</div>

<style>
  @import '../../style/items_store.css';
</style>
