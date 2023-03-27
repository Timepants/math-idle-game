<script>
  import bounceAnimationSequence from '$lib/assets/animation/bounceAnimationSequence';
  import background from '$lib/assets/img/backgrounds/forest.png';
  import '$lib/style/dynamic_img.css';
  import { onMount } from 'svelte';
  import { clear_loops } from 'svelte/internal';
  import { count } from '../stores/counter';

  const img_name = '000';
  const modules = import.meta.glob('$lib/assets/img/dinos/*.png');
  for (const key in modules) {
    // console.log(key);
  }

  const animations = {
    hop: [{}]
  };
  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
  }

  /**
   * @type {any}
   */
  let canvas;
  onMount(() => {
    const memoizedSin = (() => {
      const cache = new Map();

      return (angle) => {
        if (cache.has(angle)) {
          return cache.get(angle);
        }
        const radians = angle * (Math.PI / 180);
        const result = Math.sin(radians) * (180 / Math.PI);
        cache.set(angle, result);
        return result;
      };
    })();

    const bounceAnimation = (dinoState, animationInstructions) => {
      const { direction, nextDirection, scalex, scaley, speed } =
        animationInstructions;
      const y_val = memoizedSin(dinoState.animation_frame);
      let going_up = direction === 'f';
      const tempDinoState = { ...dinoState };

      tempDinoState.x =
        tempDinoState.startx +
        (tempDinoState.animation_frame + (going_up ? 0 : 180)) * scalex;
      tempDinoState.y = tempDinoState.starty - y_val * scaley;

      if (
        (tempDinoState.animation_frame >= 180 && going_up) ||
        (tempDinoState.animation_frame <= -360 && !going_up)
      ) {
        if (nextDirection === direction) {
          // do nothing
        }
        tempDinoState.startx = dinoState.x;
        tempDinoState.animation_frame = nextDirection === 'f' ? 0 : -180;
        tempDinoState.animation_cycle += 1;
      }

      tempDinoState.animation_frame = going_up
        ? tempDinoState.animation_frame + speed
        : tempDinoState.animation_frame - speed;

      return tempDinoState;
    };

    function createRandomDino() {
      const startx = Math.random() * (1308 - 20) + 20;
      // const starty = Math.random() * (2008 - 20) + 20;
      const scale = Math.random() * (0.5 - 0.09) + 0.09;
      const dinoState = {
        imgNumber: Math.floor(Math.random() * 46),
        // imgNumber: 1,
        img: new Image(),
        scale: scale,
        startx: startx / scale,
        x: startx / scale,
        starty: 200 / scale + 950,
        y: 200 / scale + 950,
        opacity: 0,
        // starty: 1500,
        // y: 1500,
        animation_frame: 0,
        animation_cycle: Math.floor(
          Math.random() * bounceAnimationSequence.length
        ),
        animation_type: 'hop'
      };
      dinoState.img.src = `/src/lib/assets/img/dinos/${pad(
        dinoState.imgNumber,
        3
      )}.png`;

      return dinoState;
    }

    /**
     * @type {any[]}
     */
    const dinoStates = [];

    const ctx = canvas.getContext('2d');
    let frame = requestAnimationFrame(loop);
    let img = new Image();
    img.src = '/src/lib/assets/img/backgrounds/forest.png';

    // WAIT TILL IMAGE IS LOADED.
    img.onload = function () {
      fill_canvas(img); // FILL THE CANVAS WITH THE IMAGE.
    };

    let prevCount = 0;

    const updateDino = (newCount) => {
      if (newCount > prevCount) {
        let nOfRuns = Math.floor((newCount - prevCount) / 30);
        if (nOfRuns > 0) {
          for (let index = 0; index < nOfRuns; index++) {
            const newDino = createRandomDino();
            dinoStates.push(newDino);
          }

          prevCount = newCount;
          dinoStates.sort((a, b) => a.scale - b.scale);
        }
      } else if (newCount < prevCount && dinoStates.length > 0) {
        let nOfRuns = Math.floor((prevCount - newCount) / 30);
        if (prevCount * 0.6 > newCount) {
          let nOfRuns = Math.floor(dinoStates.length * 0.5);
        }
        for (let index = 0; index < nOfRuns; index++) {
          const randomIndex = Math.floor(Math.random() * dinoStates.length);
          dinoStates.splice(randomIndex, 1);
        }
        prevCount = newCount;
      }
    };

    count.subscribe(updateDino);
    /**
     * @param {HTMLImageElement} img
     */
    function fill_canvas(img) {
      // CREATE CANVAS CONTEXT.
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
    }
    let going_up = true;

    /**
     * @param {number} t
     */
    function loop(t) {
      frame = requestAnimationFrame(loop);
      // let dinoStates = [createRandomDino()];

      ctx.drawImage(img, 0, 0);
      for (let index = 0; index < dinoStates.length; index++) {
        const radions = dinoStates[index].animation_frame * (Math.PI / 180);
        const y_val = Math.sin(radions) * (180 / Math.PI);
        if (
          dinoStates[index].animation_cycle >= bounceAnimationSequence.length
        ) {
          dinoStates[index].animation_cycle = 0;
        }

        dinoStates[index] = bounceAnimation(
          dinoStates[index],
          bounceAnimationSequence[dinoStates[index].animation_cycle]
        );
        dinoStates[index].opacity =
          dinoStates[index].opacity < 1 ? dinoStates[index].opacity + 0.01 : 1;
        ctx.globalAlpha = dinoStates[index].opacity;
        ctx.drawImage(
          dinoStates[index].img,
          dinoStates[index].x * dinoStates[index].scale,
          dinoStates[index].y * dinoStates[index].scale,
          dinoStates[index].img.width * dinoStates[index].scale,
          dinoStates[index].img.height * dinoStates[index].scale
        );
        ctx.globalAlpha = 1;
        // const { direction } =
        //   bounceAnimationSequence[dinoStates[index].animation_cycle];
      }
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<canvas bind:this={canvas} width={32} height={32} />

<style>
  canvas {
    width: 100%;
    /* padding-bottom: 75%; */
  }
</style>
