export const on = (key, callback) =>
  document.addEventListener(key, callback);

export const off = (key, callback) =>
  document.removeEventListener(key, callback);

export function createGhostNode(
  ghost,
  canvas,
  direction,
  transition,
  callback
) {
  if (!transition) {
    ghost.display = 'none';
    return callback();
  }

  ghost.style.display = 'block';
  ghost.innerHTML = canvas.innerHTML;
  canvas.style.top = direction === 'down' ? '100%' : '-100%';

  setTimeout(
    () => {
      if (direction === 'down') {
        ghost.style.top = '-100%'
        canvas.style.top = '0%'
      } else {
        ghost.style.top = '100%'
        canvas.style.top = '0%';
      };
    },
    10
  );

  setTimeout(
    () => {
      ghost.style.top = '0';
      ghost.style.display = 'none';
    },
    700
  );

  callback();
}
