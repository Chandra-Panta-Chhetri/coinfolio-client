export function delayJS(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

export * from "./Format";
export * from "./Worklets";
