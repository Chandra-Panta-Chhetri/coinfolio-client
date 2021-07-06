import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { getYForX } from "react-native-redash";
import CONSTANTS from "../../Constants";

const Cursor = ({
  modifiedData,
  selected,
  size = CONSTANTS.LINE_CHART_CURSOR_SIZE,
  maxWidth,
  yPos
}) => {
  const active = useSharedValue(false);
  const x = useSharedValue(0);

  function setXAndYCoordinates(event) {
    "worklet";

    if (event.x >= 0 && event.x <= maxWidth) {
      x.value = event.x;
      const path = modifiedData[selected.value].data.path;
      if (path) {
        yPos.value = getYForX(path, x.value);
      }
    }
  }

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event) => {
        active.value = true;
        setXAndYCoordinates(event);
      },
      onActive: setXAndYCoordinates,
      onFinish: () => (active.value = false)
    },
    [modifiedData]
  );

  const animatedDotStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value - size / 2 },
      { translateY: yPos.value - size / 2 },
      {
        scale: withSpring(
          active.value ? 1 : 0,
          CONSTANTS.LINE_CHART_ACTIVE_GESTURE_ANIMATION_CONFIG
        )
      }
    ]
  }));

  const animatedVerticalBarStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      {
        scale: withSpring(
          active.value ? 1 : 0,
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
