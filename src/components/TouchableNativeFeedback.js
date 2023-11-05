import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback as RNTouchableNativeFeedback,
  Platform,
  View,
  StyleSheet
} from "react-native";
import { useTheme } from "react-native-paper";
import { DEVICE_TYPES, GLOBAL_CONSTANTS } from "../constants";

const TouchableNativeFeedback = ({ children, viewContainerStyle, onLayout, onPress, ...otherProps }) => {
  const { colors } = useTheme();

  return Platform.OS === DEVICE_TYPES.ANDROID &&
    Platform.Version >= GLOBAL_CONSTANTS.MIN_ANDROID_VERSION_FOR_TOUCHABLE_RIPPLES ? (
    <View style={[STYLES.rippleContainer, viewContainerStyle]} onLayout={onLayout}>
      <RNTouchableNativeFeedback
        {...otherProps}
        background={RNTouchableNativeFeedback.Ripple(colors.touchableRipple, false)}
        onPress={onPress}
      >
        {children}
      </RNTouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity
      style={viewContainerStyle}
      {...otherProps}
      activeOpacity={GLOBAL_CONSTANTS.TOUCHABLE_ACTIVE_OPACITY}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const STYLES = StyleSheet.create({
  rippleContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  }
});

export default TouchableNativeFeedback;
