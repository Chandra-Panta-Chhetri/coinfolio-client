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
    selectedGraph.value.percentChange ? `${round(percentChange.value, 3)}%` : ""
  );

  const animatedPercentChange = useAnimatedStyle(() => ({
    fontWeight: "bold",
    color: percentChange.value >= 0 ? "green" : "red",
    fontSize: 15,
    opacity: withTiming(hasPathsBeenCalculated.value ? 1 : 0)
  }));

  return (
    <>
      <View style={styles.timeAndPercent}>
        <ReText style={styles.bold} text={xVal} />
        <ReText style={animatedPercentChange} text={percentChangeLabel} />
      </View>
      <ReText style={styles.bold} text={yVal} />
    </>
  );
};

const styles = StyleSheet.create({
  timeAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default Header;
