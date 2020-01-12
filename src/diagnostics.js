let showDebug = true;

export const display = (ctx, obj, size = 20, colour = '#fff') => {
  if(!showDebug) return;

  const debugItems = [
    obj
  ];

  const padding = size * 2;
  ctx.fillStyle = colour;
  ctx.font = `${size}px monospace`;

  // Loop through debug items and display them with a 20 pixels gap in between.
  debugItems.forEach((e, i) => {
    ctx.fillText(e, padding, (size * 0.7) + padding + (i * size * 1.7));
  });
};