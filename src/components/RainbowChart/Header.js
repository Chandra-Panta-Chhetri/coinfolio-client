import React from "react";
import { StyleSheet, View } from "react-native";
import { round, ReText } from "react-native-redash";
import {
  useDerivedValue,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

const Header = ({ modifiedData, selected, maxHeight, yPos }) => {
  const selectedGraph = useDerivedValue(
    () => modifiedData[selected.value].data
  );

  const price = useDerivedValue(() => {
    const priceForYPos = interpolate(
      yPos.value,
      [maxHeight, 0],
      [selectedGraph.value.minPrice, selectedGraph.value.maxPrice]
    );
    return `$ ${round(priceForYPos, 2)}`;
  });

  const percentChange = useDerivedValue(
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
        <ReText style={percentChangeStyles} text={percentChange} />
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
