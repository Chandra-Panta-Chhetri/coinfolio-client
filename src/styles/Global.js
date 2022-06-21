import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS, COLORS } from "../constants";

export default StyleSheet.create({
  borderRadius: {
    borderRadius: 4
  },
  borderWidth: {
    borderWidth: 2
  },
  tableTopBorderWidth: {
    borderTopWidth: 0.4
  },
  tableBottomBorderWidth: {
    borderBottomWidth: 0.4
  },
  iconSize: {
    width: GLOBAL_CONSTANTS.ICON_SIZE,
    height: GLOBAL_CONSTANTS.ICON_SIZE
  },
  iconRoundness: {
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE
  },
  screenContainer: {
    paddingHorizontal: 10,
    paddingVertical: 25
  },
  lgMarginBottom: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  mdMarginBottom: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  smMarginBottom: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  },
  flatListContentContainer: {
    padding: 1
  },
  positiveNum: {
    color: COLORS.SUCCESS
  },
  negativeNum: {
    color: COLORS.ERROR
  },
  fullContainer: {
    height: "100%",
    width: "100%"
  },
  cardMargin: {
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  }
});
