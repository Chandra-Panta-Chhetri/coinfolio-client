import React from "react";
import { StyleSheet, View } from "react-native";
import { round, ReText } from "react-native-redash";
import {
  useDerivedValue,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

const Header = ({ selectedGraph, maxHeight, yPos }) => {
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
