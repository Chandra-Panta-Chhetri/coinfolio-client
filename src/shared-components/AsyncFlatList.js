import { FlatList } from "react-native";
import React from "react";
import { GLOBAL_STYLES } from "../styles";
import Reanimated from "react-native-reanimated";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function AsyncFlatList({
  isLoading,
  data,
  numSkeletons = 1,
  renderSkeleton,
  renderDataItem,
  contentContainerStyle,
  ...otherProps
}) {
  if (isLoading) {
    const dummySkeletonArray = Array(numSkeletons).fill("1");
    return (
      <AnimatedFlatList
        {...otherProps}
        data={dummySkeletonArray}
        keyExtractor={(_, i) => i}
        renderItem={renderSkeleton}
        showsVerticalScrollIndicator={false}
        style={GLOBAL_STYLES.flatListContentContainer}
        contentContainerStyle={contentContainerStyle}
      />
    );
  }

  return (
    <AnimatedFlatList
      {...otherProps}
      data={data}
      renderItem={renderDataItem}
      showsVerticalScrollIndicator={false}
      style={GLOBAL_STYLES.flatListContentContainer}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

export default AsyncFlatList;
