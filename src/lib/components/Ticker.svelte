<script>
  import { time, goodElapsed, goodStart } from "../stores/ticker";

  const formatter = new Intl.DateTimeFormat("en", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
</script>

<!-- <h1>The time is {formatter.format($time)}</h1> -->

<p>
  This page has been open for
  {$goodElapsed}
  {$goodElapsed === 1 ? "second" : "seconds"}
</p>

<!-- <button on:click={start.reset}>Reset</button> -->
