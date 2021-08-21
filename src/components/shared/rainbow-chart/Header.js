import React from "react";
import { StyleSheet, View } from "react-native";
import { round, ReText } from "react-native-redash";
import {
  useDerivedValue,
  interpolate,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import { formatTime } from "./chart-utils";
import {
  appendPlusOrMinusWorklet,
  getStylesBasedOnPosOrNegWorklet
} from "../../../GlobalUtils";
import GlobalStyles from "../../../GlobalStyles";

const Header = ({
  selectedGraph,
  yPanGesturePos,
  xPanGesturePos,
  hasPathsBeenCalculated,
  isPanGestureActive
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
    if (hasPathsBeenCalculated.value) {
      if (!isPanGestureActive.value)
        return selectedGraph.value.defaultTimeLabel;

      const xValForPos = interpolate(
        xPanGesturePos.value,
        selectedGraph.value.xAxis.range,
        selectedGraph.value.xAxis.domain
      );
      return `${formatTime(xValForPos)}`;
    }
    return "";
  });

  const percentChange = useDerivedValue(
    () => selectedGraph.value.percentChange || 0
  );

  const percentChangeLabel = useDerivedValue(() =>
    selectedGraph.value.percentChange
      ? `${appendPlusOrMinusWorklet(percentChange.value)}%`
      : ""
  );

  const animatedPercentChange = useAnimatedStyle(() => ({
    opacity: withTiming(hasPathsBeenCalculated.value ? 1 : 0),
    ...getStylesBasedOnPosOrNegWorklet(percentChange.value)
  }));

  return (
    <>
      <View style={styles.timeAndPercent}>
        <ReText style={GlobalStyles.subheading} text={xVal} />
        <ReText
          style={{ ...GlobalStyles.subheading, ...animatedPercentChange }}
          text={percentChangeLabel}
        />
      </View>
      <ReText style={GlobalStyles.subheading} text={yVal} />
    </>
  );
};

const styles = StyleSheet.create({
  timeAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default Header;
