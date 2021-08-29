import GlobalStyles from "./GlobalStyles";

export const roundPercent = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const appendPlusOrMinus = (num, strToAppend = " ") =>
  num >= 0 ? `+${strToAppend}${num}` : `-${strToAppend}${num * -1}`;

export const getStylesBasedOnPosOrNeg = (num) =>
  num >= 0 ? GlobalStyles.positiveNum : GlobalStyles.negativeNum;

export function appendPlusOrMinusWorklet(num, strToAppend = " ") {
  "worklet";
  return num >= 0 ? `+${strToAppend}${num}` : `-${strToAppend}${num * -1}`;
}

export function getStylesBasedOnPosOrNegWorklet(num) {
  "worklet";
  return num >= 0 ? { color: "#4ecf3b" } : { color: "#e60000" };
}
