<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let itemDetail = {};
</script>

lookup itemname
<button on:click={() => dispatch("activate")}>Activate</button>
{JSON.stringify(itemDetail)}
