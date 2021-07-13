import React from "react";
import { ReText } from "react-native-redash";
import { StyleSheet } from "react-native";
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

function boundXCoordinate(val, upperBound, labelWidth) {
  "worklet";
  if (val + labelWidth > upperBound) {
    return val - labelWidth - 7;
  }
  return val - labelWidth / 2 < 0 ? 0 : val - labelWidth / 2;
}

const ChartLabelItem = ({
  isPanGestureActive,
  indexOfCoordinates,
  selectedGraph,
  maxWidth,
  hasBeenCalculated
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

  const animatedStyles = useAnimatedStyle(
    () => ({
      opacity: isPanGestureActive.value || !hasBeenCalculated.value ? 0 : 1,
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
    <Reanimated.View style={animatedStyles} onLayout={onLayout}>
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
