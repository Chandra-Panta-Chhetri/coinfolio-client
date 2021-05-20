import React from "react";
import SkeletonContent from "react-native-skeleton-placeholder";

// highlightColor="#2b2b2b" backgroundColor="#4a4949"
const TopCoinCardSkeleton = () => {
  return (
    <SkeletonContent
      containerStyle={{ flex: 1, width: 300 }}
      animationDirection="horizontalLeft"
      layout={[
        // long line
        { width: 220, height: 20, marginBottom: 6, key: "smt" },
        // short line
        { width: 180, height: 20, marginBottom: 6, key: "smt2" }
      ]}
      isLoading
    />
  );
};

export default TopCoinCardSkeleton;
