import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";

const PressableView = ({ onPress, viewStyle, children }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={viewStyle}>{children}</View>
  </TouchableWithoutFeedback>
);

export default PressableView;
