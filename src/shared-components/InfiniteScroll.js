import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { GLOBAL_STYLES } from "../styles";
import Reanimated from "react-native-reanimated";
import { GLOBAL_CONSTANTS } from "../constants";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const InfiniteScroll = ({
  isLoading,
  isLoadingMore,
  data,
  numSkeletons = 1,
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
      onEndReached && onEndReached();
    }
  };

  const renderFooter = () =>
    hasMoreToFetch ? <ActivityIndicator style={STYLES.footer} animating={hasMoreToFetch} hidesWhenStopped /> : null;

  if (isLoading) {
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
      onEndReached={onScrollToEnd}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const STYLES = StyleSheet.create({
  footer: {
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default InfiniteScroll;
