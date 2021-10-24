import { GLOBAL_STYLES } from "../styles";

export const roundPercent = (num) => Number.parseFloat(num).toPrecision(2);

export const formatNumBasedOnSign = (num, strToAppend = " ") =>
  num >= 0 ? `+${strToAppend}${num}` : `-${strToAppend}${num * -1}`;

export const getStylesBasedOnSign = (num) =>
  num >= 0 ? GLOBAL_STYLES.positiveNum : GLOBAL_STYLES.negativeNum;
