import React from "react";
import { StyleSheet, View } from "react-native";
import { round, ReText } from "react-native-redash";
import {
  useDerivedValue,
  interpolate,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";

function formatAMPM(date) {
  "worklet";
  const hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  const formattedHour = hours < 10 ? "0" + hours : hours;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  return formattedHour + ":" + minutes + " " + amOrPm;
}

function formatTime(date) {
  "worklet";
  const jsDate = new Date(date * 1000);
  const dateStr = jsDate.toDateString().split(" ").slice(1, 4).join(" ");
  const timeStr = formatAMPM(jsDate);
  return `${dateStr} ${timeStr}`;
}

const Header = ({
  selectedGraph,
  maxHeight,
  yPos,
  maxWidth,
  xPos,
  hasBeenCalculated,
  isPanGestureActive
}) => {
  const price = useDerivedValue(() => {
    if (selectedGraph.value.labelCoordinates && isPanGestureActive.value) {
      const priceForYPos = interpolate(
        yPos.value,
        [maxHeight, 0],
        [
          selectedGraph.value.labelCoordinates[1].val,
          selectedGraph.value.labelCoordinates[0].val
        ]
      );
      return `$${round(priceForYPos, 2)}`;
    }
    return "";
  });

  const time = useDerivedValue(() => {
    if (selectedGraph.value.scaleX) {
      if (!isPanGestureActive.value) {
        return selectedGraph.value.defaultTimeLabel;
      }
      const timeForXPos = interpolate(
        xPos.value,
        [0, maxWidth],
        selectedGraph.value.scaleX.domain
      );
      return `${formatTime(timeForXPos)}`;
    }
    return "";
  });

  const percentChange = useDerivedValue(
    () => selectedGraph.value.percentChange || 0
  );

  const percentChangeLabel = useDerivedValue(() =>
    selectedGraph.value.percentChange ? `${round(percentChange.value, 3)}%` : ""
  );

  const percentChangeStyle = useAnimatedStyle(() => ({
    fontWeight: "bold",
    color: percentChange.value >= 0 ? "green" : "red",
    fontSize: 15,
    opacity: withTiming(hasBeenCalculated.value ? 1 : 0)
  }));

  return (
    <>
      <View style={styles.timeAndPercent}>
        <ReText style={styles.bold} text={time} />
        <ReText style={percentChangeStyle} text={percentChangeLabel} />
      </View>
      <ReText style={styles.bold} text={price} />
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
