export const calculateRadius = (radius, maxRadius, defaultRadius) => {
  if (typeof radius === "string") {
    return (radius.split("%")[0] / 100) * maxRadius;
  } else if (radius) {
    return radius;
  }
  return defaultRadius;
};
