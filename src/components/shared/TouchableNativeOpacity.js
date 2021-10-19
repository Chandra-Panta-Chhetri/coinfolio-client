import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View
} from "react-native";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";
import { useTheme } from "react-native-paper";

const TouchableNativeOpacity = ({
  children,
  viewContainerStyle = {},
  onLayout = undefined,
  ...otherProps
}) => {
  const { colors } = useTheme();

  return Platform.OS === "android" &&
    Platform.Version >=
      CONSTANTS.SHARED.MIN_ANDROID_VERSION_FOR_TOUCHABLE_RIPPLES ? (
    <View
      style={[viewContainerStyle, GlobalStyles.borderRadius]}
      onLayout={onLayout}
    >
      <TouchableNativeFeedback
        {...otherProps}
        background={TouchableNativeFeedback.Ripple(
          colors.touchableRipple,
          false
        )}
      >
        {children}
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity
      style={viewContainerStyle}
      {...{
        ...otherProps,
        activeOpacity: CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default TouchableNativeOpacity;
