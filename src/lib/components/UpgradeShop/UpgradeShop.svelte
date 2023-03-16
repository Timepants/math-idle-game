<script>
  import { itemsStore } from '$lib/stores/items';
  import PlusItem from './PlusItem.svelte';
  import PlusMinusItem from './PlusMinusItem.svelte';
</script>

{#each Object.entries($itemsStore) as [key, value]}
  {#if value.isAvailable}
    {#if value.type === 'plus'}
      <PlusItem
        on:increment={() => itemsStore.increment(key)}
        itemDetail={value}
      />
    {/if}
    {#if value.type === 'plus_minus'}
      <PlusMinusItem
        on:increment={() => itemsStore.increment(key)}
        on:decrement={() => itemsStore.decrement(key)}
        itemDetail={value}
      />
    {/if}
  {/if}
  <br />
{/each}
