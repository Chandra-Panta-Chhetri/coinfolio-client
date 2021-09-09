import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NewsItem from "./news-item/NewsItem";
import NewsItemSkeleton from "./news-item/NewsItemSkeleton";

const NewsList = ({
  isLoading,
  newsData = [],
  numSkeletonsToShow = 1,
  scrollEnabled = false,
  skeletonStyleProps = {},
  contentStyleProps = {}
}) => {
  const dummySkeletonArray = Array(numSkeletonsToShow).fill("1");

  if (isLoading && newsData.length === 0) {
    return (
      <FlatList
        data={dummySkeletonArray}
        keyExtractor={(s, i) => s + i}
        renderItem={({ index }) => (
          <NewsItemSkeleton
            containerStyle={index !== 0 ? styles.itemContainer : null}
          />
        )}
        {...skeletonStyleProps}
        listKey="NewsSkeletonList"
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
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
      {...contentStyleProps}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10
  }
});

export default NewsList;
