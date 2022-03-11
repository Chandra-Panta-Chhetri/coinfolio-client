import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { GLOBAL_STYLES } from "../styles";
import Reanimated from "react-native-reanimated";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const InfiniteScroll = ({
  isLoading,
  isLoadingMore,
  data,
  numSkeletons,
  onEndReached,
  hasMoreToFetch,
  renderSkeleton,
  renderDataItem,
  contentContainerStyle,
  ...otherProps
}) => {
  const dummySkeletonArray = Array(numSkeletons).fill("1");

  const onScrollToEnd = () => {
    if (!isLoadingMore && hasMoreToFetch) {
      onEndReached();
    }
  };

  const renderFooter = () =>
    hasMoreToFetch ? <ActivityIndicator style={STYLES.footer} animating={hasMoreToFetch} hidesWhenStopped /> : null;

  if (isLoading) {
    return (
      <AnimatedFlatList
        data={dummySkeletonArray}
        keyExtractor={(_, i) => i}
        renderItem={renderSkeleton}
        showsVerticalScrollIndicator={false}
        style={GLOBAL_STYLES.flatListContentContainer}
        contentContainerStyle={contentContainerStyle}
        {...otherProps}
      />
    );
  }

  return (
    <AnimatedFlatList
      data={data}
      renderItem={renderDataItem}
      showsVerticalScrollIndicator={false}
      style={GLOBAL_STYLES.flatListContentContainer}
      contentContainerStyle={contentContainerStyle}
      onEndReached={onScrollToEnd}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      {...otherProps}
    />
  );
};

const STYLES = StyleSheet.create({
  footer: {
    marginTop: 10
  }
});

export default InfiniteScroll;
