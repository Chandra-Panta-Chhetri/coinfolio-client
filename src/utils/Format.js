import { GLOBAL_STYLES } from "../styles";

export const getStylesBasedOnSign = (num) =>
  num >= 0 ? GLOBAL_STYLES.positiveNum : GLOBAL_STYLES.negativeNum;
