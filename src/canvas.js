let canvas;
let fps;
let stop;

export const getDim = () => ({w: canvas.width, h: canvas.height});

export const setCustomFrameRate = f => fps = f;

export const cancelAnimation = () => stop = true;

export const init = drawFn => {
  canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize',  resizeCanvas);
  resizeCanvas();

  const refresh = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, getDim().w, getDim().h);
  };

  let fpsInterval = 1000 / fps;
  let time = Date.now();
  let elapsed;

  const draw = () => {
    if(stop) return;
    requestAnimationFrame(draw);

    elapsed = Date.now() - time;

    if (elapsed > fpsInterval || typeof fps === 'undefined' || fps >= 60) {
      time = Date.now() - (elapsed % fpsInterval);

      refresh();
      drawFn(ctx);
    }
  };

  draw();
};