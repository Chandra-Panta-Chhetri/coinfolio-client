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
    borderRadius: 30
  },
  screenContainer: {
    paddingHorizontal: 10,
    paddingVertical: 25
  },
  componentContainer: {
    marginBottom: 15
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
  fullContainerDimension: {
    height: "100%",
    width: "100%"
  },
  cardMargin: {
    marginTop: 10
  }
});
