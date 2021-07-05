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

const CURSOR_SIZE = 15;
const ACTIVE_GESTURE_ANIMATION_CONFIG = {
  overshootClamping: true
};

const Cursor = ({
  dataWithPaths,
  selected,
  size = CURSOR_SIZE,
  maxWidth,
  yPos
}) => {
  const active = useSharedValue(false);
  const x = useSharedValue(0);

  const setXAndYCoordinates = (event) => {
    "worklet";

    if (event.x >= 0 && event.x <= maxWidth) {
      x.value = event.x;
      const path = dataWithPaths[selected.value].data.path;
      if (path) {
        yPos.value = getYForX(path, x.value);
      }
    }
  };

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event) => {
        active.value = true;
        setXAndYCoordinates(event);
      },
      onActive: setXAndYCoordinates,
      onFinish: () => (active.value = false)
    },
    [dataWithPaths]
  );

  const animatedDotStyles = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: x.value - size / 2 },
        { translateY: yPos.value - size / 2 },
        {
          scale: withSpring(
            active.value ? 1 : 0,
            ACTIVE_GESTURE_ANIMATION_CONFIG
          )
        }
      ]
    }),
    [dataWithPaths]
  );

  const animatedVerticalBarStyles = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: x.value },
        {
          scale: withSpring(
            active.value ? 1 : 0,
            ACTIVE_GESTURE_ANIMATION_CONFIG
          )
        }
      ]
    }),
    [dataWithPaths]
  );

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
