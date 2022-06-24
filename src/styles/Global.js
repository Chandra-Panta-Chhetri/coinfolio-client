import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS, COLORS } from "../constants";

export default StyleSheet.create({
  iconSize: {
    width: GLOBAL_CONSTANTS.ICON_SIZE,
    height: GLOBAL_CONSTANTS.ICON_SIZE
  },
  screenContainer: {
    paddingHorizontal: 10,
    paddingVertical: 25
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
