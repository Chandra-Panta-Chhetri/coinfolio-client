import { GLOBAL_STYLES } from "../styles";

export const getStylesBasedOnSign = (num) => (num >= 0 ? GLOBAL_STYLES.positiveNum : GLOBAL_STYLES.negativeNum);

export const toISOSubstring = (date) => date.toISOString().substring(0, 10);
