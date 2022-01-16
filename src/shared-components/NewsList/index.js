import React from "react";
import { FlatList } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import NewsItem from "./NewsItem";
import NewsItemSkeleton from "./NewsItemSkeleton";
import { ActivityIndicator } from "react-native-paper";

const renderNewsItem = ({ item, index }) => (
  <NewsItem news={item} containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const NewsList = ({
  isLoading,
  news = [],
  numSkeletonsToShow = 1,
  isLoadingMore,
  contentContainerStyle = {},
  onEndReached,
  hasMoreToFetch
}) => {
  const dummySkeletonArray = Array(numSkeletonsToShow).fill("1");

  const onScrollToEnd = () => {
    if (!isLoadingMore && hasMoreToFetch) {
      onEndReached();
    }
  };

  if (isLoading) {
    return (
      <FlatList
        data={dummySkeletonArray}
        keyExtractor={(_, i) => i}
        renderItem={({ index }) => <NewsItemSkeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />}
        showsVerticalScrollIndicator={false}
        style={GLOBAL_STYLES.flatListContentContainer}
        contentContainerStyle={contentContainerStyle}
      />
    );
  }

  return (
    <FlatList
      data={news}
      keyExtractor={(n) => n.url}
      renderItem={renderNewsItem}
      showsVerticalScrollIndicator={false}
      style={GLOBAL_STYLES.flatListContentContainer}
      contentContainerStyle={contentContainerStyle}
      onEndReached={onScrollToEnd}
      onEndReachedThreshold={0.2}
      ListFooterComponent={hasMoreToFetch && <ActivityIndicator style={{ marginTop: 10 }} animating={isLoadingMore} />}
    />
  );
};

export default NewsList;
