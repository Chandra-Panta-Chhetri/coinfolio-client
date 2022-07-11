import { GLOBAL_STYLES } from "../styles";

export const getStylesBasedOnSign = (num) => (num >= 0 ? GLOBAL_STYLES.positiveNum : GLOBAL_STYLES.negativeNum);

export const toISOSubstring = (date) => date.toISOString().substring(0, 10);

export const lowerCaseAndHyphenate = (str) => str.toLowerCase().split(" ").join("-");

export const objKeyToString = (key) => key.split("_").join(" ");

export const removeUrlPrefix = (url) => (url ? url.replace(/(www\.)|((http|https):\/\/)/g, "") : "");
