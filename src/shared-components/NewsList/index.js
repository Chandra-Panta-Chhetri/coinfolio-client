import React from "react";
import { FlatList } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import NewsItem from "./NewsItem";
import NewsItemSkeleton from "./NewsItemSkeleton";

const NewsList = ({
  isLoading,
  news = [],
  numSkeletonsToShow = 1,
  scrollEnabled = false,
  contentContainerStyle = {}
}) => {
  const dummySkeletonArray = Array(numSkeletonsToShow).fill("1");

  if (isLoading && news.length === 0) {
    return (
      <FlatList
        data={dummySkeletonArray}
        keyExtractor={(_, i) => i}
        renderItem={({ index }) => <NewsItemSkeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        style={GLOBAL_STYLES.flatListContentContainer}
        contentContainerStyle={contentContainerStyle}
      />
    );
  }

  return (
    <FlatList
      data={news}
      keyExtractor={(n) => n.title}
      renderItem={({ item, index }) => (
        <NewsItem news={item} containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      style={GLOBAL_STYLES.flatListContentContainer}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

export default NewsList;
