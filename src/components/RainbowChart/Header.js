import React from "react";
import { StyleSheet, View } from "react-native";
import { ReText } from "react-native-redash";
import { useDerivedValue, interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import {
  getStylesBasedOnSignWorklet,
  formatTime,
  formatPercent,
  formatNum,
  formatPrice,
  isNullOrUndefined
} from "../../utils";
import { TYPOGRAPHY } from "../../styles";

const Header = ({
  selectedGraph,
  yPanGesturePos,
  xPanGesturePos,
  hasPathsBeenCalculated,
  isPanGestureActive,
  themeColors
}) => {
  const yVal = useDerivedValue(() => {
    if (hasPathsBeenCalculated?.value && isPanGestureActive?.value) {
      const yValForPos = interpolate(
        yPanGesturePos?.value,
        selectedGraph?.value?.yAxis?.range,
        selectedGraph?.value?.yAxis?.domain
      );
      return `${formatPrice(yValForPos)}`;
    }
    return "";
  });

  const xVal = useDerivedValue(() => {
    if (hasPathsBeenCalculated?.value && isPanGestureActive?.value) {
      const xValForPos = interpolate(
        xPanGesturePos?.value,
        selectedGraph?.value?.xAxis?.range,
        selectedGraph?.value?.xAxis?.domain
      );
      return `${formatTime(xValForPos)}`;
    }
    return "";
  });

  const percentChange = useDerivedValue(() =>
    hasPathsBeenCalculated?.value ? selectedGraph?.value?.percentChange : 0
  );

  const percentChangeLabel = useDerivedValue(() =>
    isNullOrUndefined(percentChange?.value) ? "" : formatPercent(percentChange?.value)
  );

  const animatedPercentChange = useAnimatedStyle(() => ({
    opacity: withTiming(hasPathsBeenCalculated?.value ? 1 : 0),
    ...getStylesBasedOnSignWorklet(percentChange?.value)
  }));

  const textStyles = { ...TYPOGRAPHY.subheading, color: themeColors?.text };

  return (
    <>
      <View style={STYLES.timeAndPercent}>
        <ReText style={textStyles} text={xVal} />
        <ReText style={{ ...TYPOGRAPHY.subheading, ...animatedPercentChange }} text={percentChangeLabel} />
      </View>
      <ReText style={textStyles} text={yVal} />
    </>
  );
};

const STYLES = StyleSheet.create({
  timeAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default Header;
