import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  StyleSheet
} from "react-native";

const TouchableNativeOpacity = ({
  children,
  viewContainerStyle = {},
  ...otherProps
}) =>
  Platform.OS === "android" && Platform.Version >= 21 ? (
    <View style={[styles.rippleContainer, viewContainerStyle]}>
      <TouchableNativeFeedback
        {...otherProps}
        background={TouchableNativeFeedback.Ripple("gray", false)}
      >
        {children}
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity {...otherProps}>{children}</TouchableOpacity>
  );

const styles = StyleSheet.create({
  rippleContainer: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 13
  }
});

export default TouchableNativeOpacity;
