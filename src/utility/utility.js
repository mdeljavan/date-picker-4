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
export const contanisValueInArray = (arr, v) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].index === v.index) return true;
  }
  return false;
};
export const uniqueItemInarray = arr => {
  let _arr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!contanisValueInArray(_arr, arr[i])) {
      _arr.push(arr[i]);
    }
  }
  return _arr;
};