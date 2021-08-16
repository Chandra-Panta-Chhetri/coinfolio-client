import React from "react";
import { ReText } from "react-native-redash";
import { StyleSheet } from "react-native";
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { boundXCoordinate } from "./chart-utils";

const ChartLabelItem = ({
  isPanGestureActive,
  indexOfCoordinates,
  selectedGraph,
  maxWidth,
  hasPathsBeenCalculated
}) => {
  const labelWidth = useSharedValue(0);

  const onLayout = (event) =>
    (labelWidth.value = event.nativeEvent.layout.width);

  const labelInfo = useDerivedValue(() =>
    selectedGraph.value.labelCoordinates
      ? selectedGraph.value.labelCoordinates[indexOfCoordinates]
      : {
          x: 0,
          y: 0,
          val: 0
        }
  );

  const animatedLabelContainer = useAnimatedStyle(
    () => ({
      opacity:
        isPanGestureActive.value || !hasPathsBeenCalculated.value ? 0 : 1,
      position: "absolute",
      transform: [
        {
          translateX: boundXCoordinate(
            labelInfo.value.x,
            maxWidth,
            labelWidth.value
          )
        },
        { translateY: labelInfo.value.y }
      ]
    }),
    [maxWidth]
  );

  const labelValue = useDerivedValue(
    () => `$${parseFloat(labelInfo.value.val).toFixed(2)}`
  );

  return (
    <Reanimated.View style={animatedLabelContainer} onLayout={onLayout}>
      <ReText text={labelValue} style={styles.labelVal} />
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  labelVal: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default ChartLabelItem;
