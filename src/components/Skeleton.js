import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Skeleton = ({ count = 1, ...otherProps }) => {
  const { colors } = useTheme();
  const shimmerColors = [
    colors.primaryShimmer,
    colors.secondaryShimmer,
    colors.primaryShimmer
  ];

  return Array(count)
    .fill("1")
    .map((e, i) => (
      <ShimmerPlaceholder
        key={e + i}
        shimmerColors={shimmerColors}
        {...otherProps}
      />
    ));
};

export default Skeleton;
