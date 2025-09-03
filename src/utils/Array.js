export const sortAlphabetically = (strArr = []) =>
  strArr.sort((a, b) => {
    let aLowercased = a.toLowerCase();
    let bLowercased = b.toLowerCase();

    if (aLowercased < bLowercased) return -1;
    else if (aLowercased > bLowercased) return 1;
    else return 0;
  });
