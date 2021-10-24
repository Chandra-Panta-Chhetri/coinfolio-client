import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";
import { getYForX } from "react-native-redash";
import { RAINBOW_CHART_CONSTANTS } from "../../constants";

const Cursor = ({
  selectedGraph,
  cursorSize = RAINBOW_CHART_CONSTANTS.CURSOR_SIZE,
  maxWidth,
  yPanGesturePos,
  isPanGestureActive,
  xPanGesturePos,
  hasPathsBeenCalculated,
  themeColors = {}
}) => {
  function setXAndYCoordinates(event) {
    "worklet";
    if (event.x >= 0 && event.x <= maxWidth) {
      xPanGesturePos.value = event.x;
      const path = selectedGraph.value.path;
      if (path) {
        yPanGesturePos.value = getYForX(path, xPanGesturePos.value);
      }
    }
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      if (!hasPathsBeenCalculated.value) return;
      isPanGestureActive.value = true;
      setXAndYCoordinates(event);
    },
    onActive: (event) => {
      if (!hasPathsBeenCalculated.value) return;
      setXAndYCoordinates(event);
    },
    onFinish: () => (isPanGestureActive.value = false)
  });

  const animatedDot = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPanGesturePos.value - cursorSize / 2 },
      { translateY: yPanGesturePos.value - cursorSize / 2 },
      {
        scale: withSpring(
          isPanGestureActive.value ? 1 : 0,
          RAINBOW_CHART_CONSTANTS.ACTIVE_GESTURE_ANIMATION_CONFIG
        )
      }
    ]
  }));

  const animatedVerticalBar = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPanGesturePos.value },
      {
        scale: withSpring(
          isPanGestureActive.value ? 1 : 0,
          RAINBOW_CHART_CONSTANTS.ACTIVE_GESTURE_ANIMATION_CONFIG
        )
      }
    ]
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Reanimated.View style={StyleSheet.absoluteFill}>
        <Reanimated.View
          style={[
            styles.verticalBar,
            animatedVerticalBar,
            { borderLeftColor: themeColors.text }
          ]}
        />
        <Reanimated.View
          style={[
            {
              width: cursorSize,
              height: cursorSize,
              borderRadius: cursorSize / 2,
              backgroundColor: themeColors.text
            },
            animatedDot
          ]}
        />
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  verticalBar: {
    borderLeftWidth: 2,
    position: "absolute",
    top: 0,
    bottom: 0
  }
});

export default Cursor;
