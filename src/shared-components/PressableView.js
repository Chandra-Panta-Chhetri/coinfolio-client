import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";

const PressableView = ({ onPress, viewStyle = {}, children, ...otherProps }) => (
  <TouchableWithoutFeedback onPress={onPress} {...otherProps}>
    <View style={viewStyle}>{children}</View>
  </TouchableWithoutFeedback>
);

export default PressableView;
