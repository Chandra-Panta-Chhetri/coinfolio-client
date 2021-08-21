import { StyleSheet } from "react-native";
import CONSTANTS from "./Constants";

export default StyleSheet.create({
  borderRadius: {
    borderRadius: 4
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
  screenContainer: {
    paddingHorizontal: 10,
    paddingVertical: 25
  },
  componentContainer: {
    marginBottom: 15
  },
  positiveNum: {
    color: "green"
  },
  negativeNum: {
    color: "red"
  },
  display4: {
    fontSize: 112,
    lineHeight: 128,
    fontWeight: "normal"
  },
  display3: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: "normal"
  },
  display2: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: "normal"
  },
  display1: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "normal"
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "normal"
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700"
  },
  subheading: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "normal"
  },
  body2: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "700"
  },
  body1: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "normal"
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "normal"
  },
  button: {
    fontSize: 14,
    lineHeight: 20,
    textTransform: "capitalize",
    fontWeight: "700"
  },
  bold: {
    fontWeight: "bold"
  },
  textAlignCenter: {
    textAlign: "center"
  }
});
