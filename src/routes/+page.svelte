<script>
  import Addition from '../lib/components/Addition.svelte';
  import Ticker from '../lib/components/Ticker.svelte';
  import GoodCounter from '../lib/components/GoodCounter.svelte';
  import BadCounter from '../lib/components/BadCounter.svelte';
  import Subtraction from '../lib/components/Subtraction.svelte';
  import UpgradeShop from '$lib/components/UpgradeShop/UpgradeShop.svelte';
  import ActivityPortal from '$lib/components/ActivityPortal.svelte';
</script>

<GoodCounter />
<BadCounter />
<ActivityPortal />

<Addition />
<br />
<br />
<Subtraction />
<Ticker />
<UpgradeShop />
