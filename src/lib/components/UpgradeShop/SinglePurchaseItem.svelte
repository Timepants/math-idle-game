<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let itemDetail = { itemName: 'item name' };
</script>

lookup itemname
<button on:click={() => dispatch('activate')}>Activate</button>
{itemDetail.itemName}
