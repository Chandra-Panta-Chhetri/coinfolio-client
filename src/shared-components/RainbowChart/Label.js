import React from "react";
import { ReText } from "react-native-redash";
import Reanimated, { useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { TYPOGRAPHY } from "../../styles";
import { boundXCoordinateWorklet } from "../../utils";

const ChartLabelItem = ({
  isPanGestureActive,
  indexOfCoordinates,
  selectedGraph,
  maxWidth,
  hasPathsBeenCalculated,
  themeColors = {}
}) => {
  const labelWidth = useSharedValue(0);

  const onLayout = (event) => (labelWidth.value = event.nativeEvent.layout.width);

  const labelInfo = useDerivedValue(() =>
    hasPathsBeenCalculated.value ? selectedGraph.value.labelCoordinates[indexOfCoordinates] : {}
  );

  const animatedLabelContainer = useAnimatedStyle(
    () => ({
      opacity: isPanGestureActive.value || !hasPathsBeenCalculated.value ? 0 : 1,
      position: "absolute",
      transform: [
        {
          translateX: boundXCoordinateWorklet(labelInfo.value.x || 0, maxWidth, labelWidth.value)
        },
        { translateY: labelInfo.value.y || 0 }
      ]
    }),
    [maxWidth]
  );

  const labelValue = useDerivedValue(() => `${labelInfo.value.val}`);

  const STYLES = {
    ...TYPOGRAPHY.textAlignCenter,
    ...TYPOGRAPHY.body1,
    color: themeColors.text
  };

  return (
    <Reanimated.View style={animatedLabelContainer} onLayout={onLayout}>
      <ReText text={labelValue} style={STYLES} />
    </Reanimated.View>
  );
};

export default ChartLabelItem;
