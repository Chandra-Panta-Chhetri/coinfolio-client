import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  interpolate,
  useSharedValue
} from "react-native-reanimated";
import { getYForX } from "react-native-redash";
import RAINBOW_CHART_CONSTANTS from "./defaults";
import { isNullOrUndefined, formatPrice, formatTime } from "../../utils";
import { TYPOGRAPHY } from "../../styles";
import { ReText } from "react-native-redash";

const Cursor = ({
  selectedGraph,
  cursorSize = RAINBOW_CHART_CONSTANTS.CURSOR_SIZE,
  maxWidth,
  yPanGesturePos,
  isPanGestureActive,
  xPanGesturePos,
  hasPathsBeenCalculated,
  themeColors,
  selectedCurrency
}) => {
  const timePriceWidth = useSharedValue(0);

  function setXAndYCoordinates(event) {
    "worklet";
    if (event?.x >= 0 && event?.x <= maxWidth) {
      xPanGesturePos.value = event?.x;
      const path = selectedGraph?.value?.path;
      if (!isNullOrUndefined(path)) {
        yPanGesturePos.value = getYForX(path, xPanGesturePos?.value);
      }
    }
  }

  const yVal = useDerivedValue(() => {
    if (hasPathsBeenCalculated?.value && isPanGestureActive?.value) {
      const yValForPos = interpolate(
        yPanGesturePos?.value,
        selectedGraph?.value?.yAxis?.range,
        selectedGraph?.value?.yAxis?.domain
      );
      return formatPrice(yValForPos, false, selectedCurrency, true);
    }
    return "";
  }, [selectedCurrency]);

  const xVal = useDerivedValue(() => {
    if (hasPathsBeenCalculated?.value && isPanGestureActive?.value) {
      const xValForPos = interpolate(
        xPanGesturePos?.value,
        selectedGraph?.value?.xAxis?.range,
        selectedGraph?.value?.xAxis?.domain
      );
      return `${formatTime(xValForPos)}`;
    }
    return "";
  });

  const textStyles = { color: themeColors?.text, ...STYLES.infoText };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      if (!hasPathsBeenCalculated?.value) return;
      isPanGestureActive.value = true;
      setXAndYCoordinates(event);
    },
    onActive: (event) => {
      if (!hasPathsBeenCalculated?.value) return;
      setXAndYCoordinates(event);
    },
    onFinish: () => (isPanGestureActive.value = false)
  });

  const animatedCursor = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPanGesturePos?.value - cursorSize / 2 },
      { translateY: yPanGesturePos?.value - cursorSize / 2 },
      {
        scale: withSpring(isPanGestureActive?.value ? 1 : 0, RAINBOW_CHART_CONSTANTS.ACTIVE_GESTURE_ANIMATION_CONFIG)
      }
    ]
  }));

  const timePriceAnimatedStyles = useAnimatedStyle(() => {
    let xPos = xPanGesturePos?.value - timePriceWidth?.value / 2;
    if (xPos < 0) {
      xPos = 0;
    } else if (xPos + timePriceWidth?.value > maxWidth) {
      xPos = maxWidth - timePriceWidth?.value;
    }

    return {
      transform: [
        {
          translateX: xPos
        }
      ],
      opacity: withSpring(isPanGestureActive?.value ? 1 : 0, RAINBOW_CHART_CONSTANTS.ACTIVE_GESTURE_ANIMATION_CONFIG)
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Reanimated.View style={StyleSheet.absoluteFill}>
        <Reanimated.View
          style={[
            {
              width: cursorSize,
              height: cursorSize,
              borderRadius: cursorSize / 2,
              backgroundColor: themeColors?.text
            },
            animatedCursor
          ]}
        />
        <Reanimated.View
          style={[timePriceAnimatedStyles, STYLES.timePriceContainer]}
          onLayout={(event) => {
            timePriceWidth.value = event?.nativeEvent?.layout?.width;
          }}
        >
          <ReText style={textStyles} text={xVal} />
          <ReText style={textStyles} text={yVal} />
        </Reanimated.View>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const STYLES = StyleSheet.create({
  timePriceContainer: {
    alignSelf: "flex-start"
  },
  infoText: {
    ...TYPOGRAPHY.subheading,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default Cursor;
