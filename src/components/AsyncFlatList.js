import { FlatList } from "react-native";
import React from "react";
import { GLOBAL_STYLES } from "../styles";
import Reanimated from "react-native-reanimated";
import NoResults from "./NoResults";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const AsyncFlatList = ({
  isLoading,
  data,
  numSkeletons = 1,
  renderSkeleton,
  renderDataItem,
  contentContainerStyle,
  displayNoResultsInHeader = false,
  displayNoResults = false,
  ...otherProps
}) => {
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
      ListHeaderComponent={
        <>
          {otherProps?.ListHeaderComponent}
          {displayNoResults ? <NoResults /> : null}
        </>
      }
    />
  );
};

export default AsyncFlatList;
