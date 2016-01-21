window.step = function (position, n) {
  position.col++;
  if (position.col >= n) {
    position.col = 0;
    position.row ++;
  }
  return position;
};