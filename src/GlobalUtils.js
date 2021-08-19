import GlobalStyles from "./GlobalStyles";

export const roundPercent = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const appendPlusOrMinus = (num, strToAppend = " ") =>
  num >= 0 ? `+${strToAppend}${num}` : `-${strToAppend}${num * -1}`;

export const determineColor = (num) =>
  num >= 0 ? GlobalStyles.positiveNum : GlobalStyles.negativeNum;

export function appendPlusOrMinusWorklet(num, strToAppend = " ") {
  "worklet";
  return num >= 0 ? `+${strToAppend}${num}` : `-${strToAppend}${num * -1}`;
}

export function determineColorWorklet(num) {
  "worklet";
  return num >= 0 ? GlobalStyles.positiveNum : GlobalStyles.negativeNum;
}
