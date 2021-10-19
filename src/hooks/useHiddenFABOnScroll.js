import React from "react";
import { useTheme, FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import CONSTANTS from "../Constants";

const useHiddenFABOnScroll = ({
  icon,
  onFABClick = CONSTANTS.SHARED.EMPTY_FUNCTION,
  ...otherProps
}) => {
  const { colors } = useTheme();
  const isScrolling = useSharedValue(false);
  const fabContainer = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isScrolling.value ? 0 : 1) }]
  }));
  const scrollHandler = useAnimatedScrollHandler({
    onEndDrag: () => (isScrolling.value = false),
    onMomentumEnd: () => (isScrolling.value = false),
    onBeginDrag: () => (isScrolling.value = true)
  });

  return {
    scrollHandler,
    isScrolling,
    FAB: (
      <Reanimated.View style={[styles.fabPosition, fabContainer]}>
        <FAB
          style={[styles.fab, { backgroundColor: colors.primary }]}
          {...otherProps}
          icon={icon}
          color="white"
          onPress={onFABClick}
        />
      </Reanimated.View>
    )
  };
};

const styles = StyleSheet.create({
  fabPosition: {
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0
  },
  fab: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32
  }
});

export default useHiddenFABOnScroll;
