import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import NewsItem from "./NewsItem";
import NewsItemSkeleton from "./NewsItemSkeleton";

const NewsList = ({
  isLoading,
  newsData = [],
  numSkeletonsToShow = 1,
  scrollEnabled = false,
  contentContainerStyle = {}
}) => {
  const dummySkeletonArray = Array(numSkeletonsToShow).fill("1");

  if (isLoading && newsData.length === 0) {
    return (
      <FlatList
        data={dummySkeletonArray}
        keyExtractor={(s, i) => s + i}
        renderItem={({ index }) => (
          <NewsItemSkeleton
            containerStyle={index !== 0 ? STYLES.itemContainer : null}
          />
        )}
        listKey="NewsSkeletonList"
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        style={GLOBAL_STYLES.flatListContentContainer}
        contentContainerStyle={contentContainerStyle}
      />
    );
  }

  return (
    <FlatList
      data={newsData}
      keyExtractor={(n) => n.title}
      renderItem={(props) => <NewsItem {...props} />}
      listKey="NewsList"
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      style={GLOBAL_STYLES.flatListContentContainer}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

const STYLES = StyleSheet.create({
  itemContainer: {
    marginTop: 10
  }
});

export default NewsList;
