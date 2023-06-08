import { FlatList, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { ActivityIndicator } from "react-native-paper";
import { GLOBAL_STYLES } from "../styles";
import Reanimated from "react-native-reanimated";
import { GLOBAL_CONSTANTS } from "../constants";
import { isNullOrUndefined } from "../utils";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const InfiniteScroll = ({
  isLoading,
  isLoadingMore = false,
  data,
  numSkeletons = 1,
  onEndReached,
  hasMoreToFetch = false,
  renderSkeleton,
  renderDataItem,
  contentContainerStyle,
  ...otherProps
}) => {
  const onScrollToEnd = () => {
    if (!isLoadingMore && hasMoreToFetch && !isNullOrUndefined(onEndReached)) {
      onEndReached();
    }
  };

  const renderFooter = useCallback(
    () => <ActivityIndicator style={STYLES.footer} animating={hasMoreToFetch} hidesWhenStopped />,
    [hasMoreToFetch]
  );

  if (isLoading || data?.length === 0) {
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
