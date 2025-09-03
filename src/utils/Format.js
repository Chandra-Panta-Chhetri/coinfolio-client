import { GLOBAL_STYLES } from "../styles";
import { isNullOrUndefined } from "./common";

export const getStylesBasedOnSign = (num) => (num >= 0 ? GLOBAL_STYLES.positiveNum : GLOBAL_STYLES.negativeNum);

export const lowerCaseAndHyphenate = (str) => (isNullOrUndefined(str) ? "" : str?.toLowerCase()?.split(" ")?.join("-"));

export const objKeyToString = (key) => (isNullOrUndefined(key) ? "" : key?.split("_")?.join(" "));

export const removeUrlPrefix = (url) =>
  isNullOrUndefined(url) ? "" : url?.replace(/(www\.)|((http|https):\/\/)/g, "");
