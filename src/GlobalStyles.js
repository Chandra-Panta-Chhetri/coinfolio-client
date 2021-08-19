import { StyleSheet } from "react-native";
import CONSTANTS from "./Constants";

export default StyleSheet.create({
  borderRadius: {
    borderRadius: 6
  },
  iconSize: {
    width: CONSTANTS.SHARED.AVATAR_IMAGE_SIZE,
    height: CONSTANTS.SHARED.AVATAR_IMAGE_SIZE
  },
  iconRoundness: {
    borderRadius: 30
  },
  imagePreview: {
    width: 90,
    height: 90
  },
  screenPadding: {
    padding: 10
  },
  portfolioElementMargin: {
    marginBottom: 15
  },
  positiveNum: {
    color: "green",
    fontWeight: "bold"
  },
  negativeNum: {
    color: "red",
    fontWeight: "bold"
  }
});
