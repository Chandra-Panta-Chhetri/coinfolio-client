import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  StyleSheet
} from "react-native";
import CONSTANTS from "../../Constants";

const TouchableNativeOpacity = ({
  children,
  viewContainerStyle = {},
  ...otherProps
}) =>
  Platform.OS === "android" &&
  Platform.Version >=
    CONSTANTS.SHARED.MIN_ANDROID_VERSION_FOR_TOUCHABLE_RIPPLES ? (
    <View style={[styles.rippleContainer, viewContainerStyle]}>
      <TouchableNativeFeedback
        {...otherProps}
        background={TouchableNativeFeedback.Ripple(
          CONSTANTS.SHARED.TOUCHABLE_RIPPLE_COLOR,
          false
        )}
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
    borderRadius: CONSTANTS.SHARED.BORDER_RADIUS
  }
});

export default TouchableNativeOpacity;
