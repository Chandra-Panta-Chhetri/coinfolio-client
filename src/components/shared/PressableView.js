import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import CONSTANTS from "../../Constants";

const PressableView = ({
  onPress = CONSTANTS.SHARED.EMPTY_FUNCTION,
  viewStyle = {},
  children
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={viewStyle}>{children}</View>
  </TouchableWithoutFeedback>
);

export default PressableView;
