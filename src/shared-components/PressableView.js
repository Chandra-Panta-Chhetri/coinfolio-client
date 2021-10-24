import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { GLOBAL_CONSTANTS } from "../constants";

const PressableView = ({
  onPress = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  viewStyle = {},
  children,
  ...otherProps
}) => (
  <TouchableWithoutFeedback onPress={onPress} {...otherProps}>
    <View style={viewStyle}>{children}</View>
  </TouchableWithoutFeedback>
);

export default PressableView;
