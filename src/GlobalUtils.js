export const roundPercent = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
