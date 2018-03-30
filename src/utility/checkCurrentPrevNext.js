export const checkCurrentPrevNext = ( curr, max, min, howManyChange = 1 ) => {
  let current = curr;
  if ( current > max ) {
    current = min;
  } else if ( current < min ) {
    current = max;
  }
  const prev = current - howManyChange < min ? max : current - howManyChange;
  const next = current + howManyChange > max ? min : current + howManyChange;
  return {
    current,
    prev,
    next
  };
};