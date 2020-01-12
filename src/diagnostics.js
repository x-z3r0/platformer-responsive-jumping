let showDebug = true;

export const display = (ctx, obj, size = 20, colour = '#fff') => {
  if (!showDebug) return;

  const round = (n, d = 0) => Math.round(n * (10 ** d)) / (10 ** d);

  const debugItems = [];

  for (const [key, value] of Object.entries(obj)) {
    debugItems.push(`${key}: ${typeof value === 'number' ? round(value, 10) : value}`);
  }

  const padding = size * 2;
  ctx.fillStyle = colour;
  ctx.font = `${size}px monospace`;

  // Loop through debug items and display them.
  debugItems.forEach((e, i) => {
    ctx.fillText(e, padding, (size * 0.7) + padding + (i * size * 2.5));
  });
};