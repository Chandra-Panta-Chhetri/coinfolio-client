import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback as RNTouchableNativeFeedback,
  Platform,
  View
} from "react-native";
import { useTheme } from "react-native-paper";
import { GLOBAL_STYLES } from "../styles";
import { GLOBAL_CONSTANTS } from "../constants";

const TouchableNativeFeedback = ({
  children,
  viewContainerStyle = {},
  onLayout = undefined,
  ...otherProps
}) => {
  const { colors } = useTheme();

  return Platform.OS === "android" &&
    Platform.Version >=
      GLOBAL_CONSTANTS.MIN_ANDROID_VERSION_FOR_TOUCHABLE_RIPPLES ? (
    <View
      style={[viewContainerStyle, GLOBAL_STYLES.borderRadius]}
      onLayout={onLayout}
    >
      <RNTouchableNativeFeedback
        {...otherProps}
        background={RNTouchableNativeFeedback.Ripple(
          colors.touchableRipple,
          false
        )}
      >
        {children}
      </RNTouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity
      style={viewContainerStyle}
      {...{
        ...otherProps,
        activeOpacity: GLOBAL_CONSTANTS.TOUCHABLE_ACTIVE_OPACITY
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default TouchableNativeFeedback;
