<script>
  import Addition from '../lib/components/Addition.svelte';
  import GoodCounter from '../lib/components/GoodCounter.svelte';
  import BadCounter from '../lib/components/BadCounter.svelte';
  import Subtraction from '../lib/components/Subtraction.svelte';
  import UpgradeShop from '$lib/components/UpgradeShop/UpgradeShop.svelte';
  import ActivityPortal from '$lib/components/ActivityPortal.svelte';
  import Ticker from '$lib/components/Ticker.svelte';
</script>

<div class="layout">
  <div class="counters">
    <GoodCounter />
    <div class="separator" />
    <BadCounter />
  </div>
  <div class="main">
    <div class="left-column">
      <ActivityPortal />
    </div>
    <div class="right-column">
      <Addition />
      <Subtraction />
      <UpgradeShop />
    </div>
  </div>
</div>
<Ticker />

<style>
  @import '../lib/style/general_styles.css';

  .layout {
    display: flex;
    flex-direction: column;
  }

  .counters {
    display: flex;
    padding-left: 2rem;
    justify-content: left;
    gap: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    height: 80px;
  }

  .main {
    display: flex;
    flex-direction: row;
  }

  .left-column {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .separator {
    height: 100%;
    border-left: 1px solid black;
    margin: 0 1rem;
  }
</style>
