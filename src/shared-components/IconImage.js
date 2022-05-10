import { Avatar } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS } from "../constants";

const IconImage = ({ source }) => (
  <Avatar.Image size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE} source={source} style={STYLES.icon} />
);

const STYLES = StyleSheet.create({
  icon: {
    backgroundColor: "transparent"
  }
});

export default IconImage;
