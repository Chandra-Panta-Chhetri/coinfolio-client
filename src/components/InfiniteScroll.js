import { FlatList, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { ActivityIndicator } from "react-native-paper";
import { GLOBAL_STYLES } from "../styles";
import Reanimated from "react-native-reanimated";
import { GLOBAL_CONSTANTS } from "../constants";
import { isNullOrUndefined } from "../utils";
import NoResults from "./NoResults";

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
  displayNoResultsInHeader = false,
  displayNoResults = false,
  ...otherProps
}) => {
  const onScrollToEnd = () => {
    if (!isLoadingMore && hasMoreToFetch && data?.length > 0 && !isNullOrUndefined(onEndReached)) {
      onEndReached();
    }
  };

  const renderFooter = useCallback(
    () => <ActivityIndicator style={STYLES.footer} animating={hasMoreToFetch && data?.length > 0} hidesWhenStopped />,
    [hasMoreToFetch, data]
  );

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
  } else if (!displayNoResultsInHeader && displayNoResults) {
    return <NoResults />;
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
      ListHeaderComponent={
        <>
          {otherProps?.ListHeaderComponent}
          {displayNoResults ? <NoResults /> : null}
        </>
      }
    />
  );
};

const STYLES = StyleSheet.create({
  footer: {
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default InfiniteScroll;
