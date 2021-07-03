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

const Cursor = ({ dataWithPaths, selected, size = CURSOR_SIZE, maxWidth }) => {
  const active = useSharedValue(false);
  const x = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      if (event.x >= 0 && event.x <= maxWidth) {
        x.value = event.x;
      }
      active.value = true;
    },
    onActive: (event) => {
      if (event.x >= 0 && event.x <= maxWidth) {
        x.value = event.x;
      }
    },
    onFinish: () => {
      active.value = false;
    }
  });

  const animatedStyles = useAnimatedStyle(() => {
    const translateX = x.value - size / 2;
    const path = dataWithPaths[selected.value].data.path;

    if (!path) {
      return {};
    }

    const translateY = getYForX(path, x.value) - size / 2;
    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(active.value ? 1 : 0) }
      ]
    };
  }, [dataWithPaths]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Reanimated.View style={StyleSheet.absoluteFill}>
        <Reanimated.View
          style={[
            styles.cursorBody,
            { width: size, height: size, borderRadius: size / 2 },
            animatedStyles
          ]}
        />
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cursorBody: {
    backgroundColor: "black"
  }
});

export default Cursor;
