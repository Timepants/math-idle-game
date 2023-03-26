<script>
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
    hop: [{}],
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
    const bounceAnimation = (dinoState, animationInstructions) => {
      const { direction, nextDirection, scalex, scaley, speed } =
        animationInstructions;

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

    const bounceAnimationSequence = [
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.7,
        scaley: 1,
        speed: 5,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.7,
        scaley: 1,
        speed: 5,
      },
      {
        direction: 'f',
        nextDirection: 'b',
        scalex: 0.5,
        scaley: 1,
        speed: 7,
      },
      {
        direction: 'b',
        nextDirection: 'b',
        scalex: 0.5,
        scaley: 1,
        speed: 7,
      },
      {
        direction: 'b',
        nextDirection: 'f',
        scalex: 0.9,
        scaley: 1,
        speed: 5,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.5,
        scaley: 1,
        speed: 7,
      },
      {
        direction: 'f',
        nextDirection: 'b',
        scalex: 0.5,
        scaley: 1,
        speed: 7,
      },
      {
        direction: 'b',
        nextDirection: 'b',
        scalex: 1.5,
        scaley: 1,
        speed: 5,
      },
      {
        direction: 'b',
        nextDirection: 'f',
        scalex: 0.5,
        scaley: 1.5,
        speed: 6,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.5,
        scaley: 0.5,
        speed: 6,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.2,
        scaley: 0.5,
        speed: 5,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.2,
        scaley: 0.2,
        speed: 5,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.2,
        scaley: 0.5,
        speed: 3,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0,
        scaley: 0,
        speed: 1,
      },
      {
        direction: 'f',
        nextDirection: 'f',
        scalex: 0.2,
        scaley: 0.3,
        speed: 6,
      },
      {
        direction: 'f',
        nextDirection: 'b',
        scalex: 0.2,
        scaley: 0.4,
        speed: 4,
      },
      {
        direction: 'b',
        nextDirection: 'f',
        scalex: 0.2,
        scaley: 0.2,
        speed: 5,
      },
      {
        direction: 'f',
        nextDirection: 'b',
        scalex: 0.2,
        scaley: 0.4,
        speed: 6,
      },
      {
        direction: 'b',
        nextDirection: 'b',
        scalex: 0.5,
        scaley: 0.4,
        speed: 5,
      },
      {
        direction: 'b',
        nextDirection: 'f',
        scalex: 0.5,
        scaley: 0.3,
        speed: 7,
      },
    ];
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
        // starty: 1500,
        // y: 1500,
        animation_frame: 0,
        animation_cycle: Math.floor(
          Math.random() * bounceAnimationSequence.length
        ),
        animation_type: 'hop',
      };
      console.log(dinoState.imgNumber);
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
    for (let index = 0; index < 10; index++) {
      dinoStates.push(createRandomDino());
    }
    dinoStates.sort((a, b) => a.scale - b.scale);
    const ctx = canvas.getContext('2d');
    let frame = requestAnimationFrame(loop);
    let img = new Image();
    img.src = '/src/lib/assets/img/backgrounds/forest.png';

    // WAIT TILL IMAGE IS LOADED.
    img.onload = function () {
      fill_canvas(img); // FILL THE CANVAS WITH THE IMAGE.
    };

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
        ctx.drawImage(
          dinoStates[index].img,
          dinoStates[index].x * dinoStates[index].scale,
          dinoStates[index].y * dinoStates[index].scale,
          dinoStates[index].img.width * dinoStates[index].scale,
          dinoStates[index].img.height * dinoStates[index].scale
        );
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
    height: 100%;
    /* background-color: #666;
    background-image: url(/src/lib/assets/img/backgrounds/forest.png);
    -webkit-mask: url(/src/lib/assets/img/dinos/000.png) 50% 50% no-repeat;
    mask: url(/src/lib/assets/img/dinos/000.png) 50% 50% no-repeat; */
  }
</style>
