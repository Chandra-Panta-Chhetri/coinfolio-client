import React from "react";
import { StyleSheet, View } from "react-native";
import { round, ReText } from "react-native-redash";
import {
  useDerivedValue,
  interpolate,
  useAnimatedStyle
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

const Header = ({ selectedGraph, maxHeight, yPos, maxWidth, xPos }) => {
  const price = useDerivedValue(() => {
    if (selectedGraph.value.labelCoordinates) {
      const priceForYPos = interpolate(
        yPos.value,
        [maxHeight, 0],
        [
          selectedGraph.value.labelCoordinates[1].val,
          selectedGraph.value.labelCoordinates[0].val
        ]
      );
      return `$ ${round(priceForYPos, 2)}`;
    }
    return "";
  });

  const time = useDerivedValue(() => {
    if (selectedGraph.value.scaleX) {
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

  const percentChangeLabel = useDerivedValue(
    () => `${round(selectedGraph.value.percentChange, 3)}%`
  );

  const percentChangeStyles = useAnimatedStyle(() => ({
    fontWeight: "bold",
    color: percentChange.value > 0 ? "green" : "red"
  }));

  return (
    <View style={styles.container}>
      <View>
        <ReText style={styles.value} text={time} />
        <ReText style={styles.value} text={price} />
      </View>
      <View>
        <ReText style={percentChangeStyles} text={percentChangeLabel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  value: {
    fontWeight: "bold"
  }
});

export default Header;
