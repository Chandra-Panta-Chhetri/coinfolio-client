import React from "react";
import { StyleSheet, View } from "react-native";
import { round, ReText } from "react-native-redash";
import { useDerivedValue, interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import {
  formatNumBasedOnSignWorklet,
  getStylesBasedOnSignWorklet,
  formatTimeWorklet,
  roundPercentWorklet
} from "../../utils";
import { TYPOGRAPHY } from "../../styles";

const Header = ({
  selectedGraph,
  yPanGesturePos,
  xPanGesturePos,
  hasPathsBeenCalculated,
  isPanGestureActive,
  themeColors = {}
}) => {
  const yVal = useDerivedValue(() => {
    if (hasPathsBeenCalculated.value && isPanGestureActive.value) {
      const yValForPos = interpolate(
        yPanGesturePos.value,
        selectedGraph.value.yAxis.range,
        selectedGraph.value.yAxis.domain
      );
      return `$${round(yValForPos, 2)}`;
    }
    return "";
  });

  const xVal = useDerivedValue(() => {
    if (hasPathsBeenCalculated.value && isPanGestureActive.value) {
      const xValForPos = interpolate(
        xPanGesturePos.value,
        selectedGraph.value.xAxis.range,
        selectedGraph.value.xAxis.domain
      );
      return `${formatTimeWorklet(xValForPos)}`;
    }
    return "";
  });

  const percentChange = useDerivedValue(() => selectedGraph.value.percentChange || 0);

  const percentChangeLabel = useDerivedValue(() =>
    selectedGraph.value.percentChange ? `${formatNumBasedOnSignWorklet(roundPercentWorklet(percentChange.value))}%` : ""
  );

  const animatedPercentChange = useAnimatedStyle(() => ({
    opacity: withTiming(hasPathsBeenCalculated.value ? 1 : 0),
    ...getStylesBasedOnSignWorklet(percentChange.value)
  }));

  const textStyles = { ...TYPOGRAPHY.subheading, color: themeColors.text };

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
