import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";
import { getYForX } from "react-native-redash";
import CONSTANTS from "../../Constants";

const Cursor = ({
  selectedGraph,
  size = CONSTANTS.LINE_CHART_CURSOR_SIZE,
  maxWidth,
  yPos,
  isPanGestureActive,
  xPos,
  hasBeenCalculated
}) => {
  function setXAndYCoordinates(event) {
    "worklet";
    if (event.x >= 0 && event.x <= maxWidth) {
      xPos.value = event.x;
      const path = selectedGraph.value.path;
      if (path) {
        yPos.value = getYForX(path, xPos.value);
      }
    }
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      if (!hasBeenCalculated.value) return;
      isPanGestureActive.value = true;
      setXAndYCoordinates(event);
    },
    onActive: (event) => {
      if (!hasBeenCalculated.value) return;
      setXAndYCoordinates(event);
    },
    onFinish: () => (isPanGestureActive.value = false)
  });

  const animatedDotStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPos.value - size / 2 },
      { translateY: yPos.value - size / 2 },
      {
        scale: withSpring(
          isPanGestureActive.value ? 1 : 0,
          CONSTANTS.LINE_CHART_ACTIVE_GESTURE_ANIMATION_CONFIG
        )
      }
    ]
  }));

  const animatedVerticalBarStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPos.value },
      {
        scale: withSpring(
          isPanGestureActive.value ? 1 : 0,
          CONSTANTS.LINE_CHART_ACTIVE_GESTURE_ANIMATION_CONFIG
        )
      }
    ]
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Reanimated.View style={StyleSheet.absoluteFill}>
        <Reanimated.View
          style={[styles.verticalLine, animatedVerticalBarStyles]}
        />
        <Reanimated.View
          style={[
            styles.cursorBody,
            { width: size, height: size, borderRadius: size / 2 },
            animatedDotStyles
          ]}
        />
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cursorBody: {
    backgroundColor: "black"
  },
  verticalLine: {
    borderLeftWidth: 2,
    borderLeftColor: "black",
    position: "absolute",
    top: 0,
    bottom: 0
  }
});

export default Cursor;
