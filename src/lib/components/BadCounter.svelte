<script>
  import { badCount } from '../stores/counter';

  function calculateColor(value, maxValue) {
    const red = Math.min(Math.floor((value / maxValue) * 255), 255);
    const green = Math.min(Math.floor((1 - value / maxValue) * 255), 255);
    return `rgb(${red}, ${green}, 0)`;
  }
</script>

<h1>
  Lava level:
  <span
    class="bad-counter"
    style="color: {calculateColor(Math.floor($badCount), 75)}"
  >
    {Math.floor($badCount)}
  </span>
</h1>
