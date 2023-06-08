import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  cancelAnimation
} from "react-native-reanimated";

const LINEAR_GRADIENT = {
  START: {
    x: -1,
    y: 0.5
  },
  END: {
    x: 2,
    y: 0.5
  },
  LOCATIONS: [0.3, 0.5, 0.7]
};

const Skeleton = ({ onLayout, translateXSV, shimmerColors, containerStyles = {} }) => {
  const innerViewStyle = useAnimatedStyle(() => ({
    width: translateXSV.value === null ? "0%" : "50%",
    height: "100%",
    transform: [{ translateX: translateXSV.value === null ? 0 : translateXSV.value }]
  }));
  return (
    <View style={[STYLES.container, containerStyles, { backgroundColor: shimmerColors[0] }]} onLayout={onLayout}>
      <Animated.View style={innerViewStyle}>
        <LinearGradient
          colors={shimmerColors}
          style={STYLES.linearGradient}
          start={LINEAR_GRADIENT.START}
          end={LINEAR_GRADIENT.END}
          locations={LINEAR_GRADIENT.LOCATIONS}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonContainer = ({ count = 1, style }) => {
  const translateX = useSharedValue(null);
  const { colors } = useTheme();
  const shimmerColors = [colors.primaryShimmer, colors.secondaryShimmer, colors.primaryShimmer];

  useEffect(() => {
    return () => {
      cancelAnimation(translateX);
    };
  }, []);

  const onLayout = (event) => {
    const layoutWidth = event.nativeEvent.layout.width;
    if (translateX.value === null && layoutWidth !== 0) {
      translateX.value = layoutWidth * -1;
      translateX.value = withRepeat(
        withTiming(layoutWidth, {
          duration: 1000
        }),
        -1
      );
    }
  };

  return Array(count)
    .fill("1")
    .map((_, i) => (
      <Skeleton
        onLayout={i === 0 ? onLayout : undefined}
        translateXSV={translateX}
        key={i}
        shimmerColors={shimmerColors}
        containerStyles={style}
      />
    ));
};

const STYLES = StyleSheet.create({
  container: {
    overflow: "hidden"
  },
  linearGradient: {
    flex: 1
  }
});

export default SkeletonContainer;
