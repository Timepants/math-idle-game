<script>
  import background from '$lib/assets/img/backgrounds/forest.png';
  import '$lib/style/dynamic_img.css';
  import { onMount } from 'svelte';
  import { clear_loops } from 'svelte/internal';
  const img_name = '000';
  const modules = import.meta.glob('$lib/assets/img/dinos/*.png');
  for (const key in modules) {
    // console.log(key);
  }

  const animations = {
    hop: [{}]
  };

  /**
   * @type {any}
   */
  let canvas;
  onMount(() => {
    const ctx = canvas.getContext('2d');
    let frame = requestAnimationFrame(loop);
    let img = new Image();
    img.src = '/src/lib/assets/img/backgrounds/forest.png';
    let dino = new Image();
    let dinoState = {
      startx: 308,
      starty: 608,
      x: 308,
      y: 608,
      animation_frame: 0,
      animation_cycle: 0,
      animation_type: 'hop'
    };
    dino.src = '/src/lib/assets/img/dinos/000.png';
    // WAIT TILL IMAGE IS LOADED.
    img.onload = function () {
      fill_canvas(img, dino); // FILL THE CANVAS WITH THE IMAGE.
    };

    /**
     * @param {HTMLImageElement} img
     * @param {HTMLImageElement} dino
     */
    function fill_canvas(img, dino) {
      // CREATE CANVAS CONTEXT.
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      ctx.drawImage(dino, 308, 608, dino.width * 0.25, dino.height * 0.25); // DRAW THE IMAGE TO THE CANVAS.
    }
    let going_up = true;
    const bounceAnimation = (
      dinoState,
      direction,
      nextDirection,
      scalex,
      scaley,
      speed
    ) => {
      console.log(dinoState);
      const radions = dinoState.animation_frame * (Math.PI / 180);
      const y_val = Math.sin(radions) * (180 / Math.PI);
      const tempDinoState = { ...dinoState };
      if (direction === 'f') {
        going_up = true;
      } else {
        going_up = false;
      }
      tempDinoState.x =
        tempDinoState.startx +
        (tempDinoState.animation_frame + (direction === 'f' ? 0 : 180)) *
          scalex;
      tempDinoState.y = tempDinoState.starty - y_val * scaley;
      if (
        (tempDinoState.animation_frame >= 180 && direction === 'f') ||
        (tempDinoState.animation_frame <= -360 && direction === 'b')
      ) {
        if (nextDirection === direction) {
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

    bounceAnimationSequence = [
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 1,
        scaley: 0.3,
        speed: 5
      }
    ];

    /**
     * @param {number} t
     */
    function loop(t) {
      frame = requestAnimationFrame(loop);
      const radions = dinoState.animation_frame * (Math.PI / 180);
      const y_val = Math.sin(radions) * (180 / Math.PI);
      if (dinoState.animation_cycle === 4) {
        dinoState.animation_cycle = 0;
      }
      if (dinoState.animation_cycle === 0) {
        dinoState = bounceAnimation(dinoState, 'f', 'f', 1, 0.3, 5);
      }
      if (dinoState.animation_cycle === 1) {
        dinoState = bounceAnimation(dinoState, 'f', 'b', 0.1, 0.3, 5);
      }
      if (dinoState.animation_cycle === 2) {
        console.log('bb');
        dinoState = bounceAnimation(dinoState, 'b', 'b', 1, 0.3, 5);
      }
      if (dinoState.animation_cycle === 3) {
        console.log('bf');
        dinoState = bounceAnimation(dinoState, 'b', 'f', 0.1, 0.3, 5);
      }
      //   going_up =
      //     dinoState.animation_frame >= 180
      //       ? false
      //       : dinoState.animation_frame <= 0
      //       ? true
      //       : going_up;

      ctx.drawImage(img, 0, 0);
      ctx.drawImage(
        dino,
        dinoState.x,
        dinoState.y,
        dino.width * 0.2,
        dino.height * 0.2
      );

      //   frame = requestAnimationFrame(loop);
      //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //   for (let p = 0; p < imageData.data.length; p += 4) {
      //     const i = p / 4;
      //     const x = i % canvas.width;
      //     const y = (i / canvas.width) >>> 0;
      //     const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
      //     const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
      //     const b = 128;
      //     imageData.data[p + 0] = r;
      //     imageData.data[p + 1] = g;
      //     imageData.data[p + 2] = b;
      //     imageData.data[p + 3] = 255;
      //   }
      //   ctx.putImageData(imageData, 0, 0);
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
    height: 100%;
    /* background-color: #666;
    background-image: url(/src/lib/assets/img/backgrounds/forest.png);
    -webkit-mask: url(/src/lib/assets/img/dinos/000.png) 50% 50% no-repeat;
    mask: url(/src/lib/assets/img/dinos/000.png) 50% 50% no-repeat; */
  }
</style>
