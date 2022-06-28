import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../styles";
import { GLOBAL_CONSTANTS, NEWS_CONSTANTS } from "../constants";
import DropDown from "./DropDown";
import InfiniteScroll from "./InfiniteScroll";
import NewsItemSkeleton from "./NewsItem/Skeleton";
import NewsItem from "./NewsItem";

const renderNewsSkeleton = ({ index }) => (
  <NewsItemSkeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const renderNewsItem = ({ item, index }) => (
  <NewsItem key={item.id.toString()} news={item} containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const NewsList = ({ isLoading, news, onFilterChange, fetchMore, isLoadingMore, hasMoreToFetch }) => {
  const [newsFilterIndex, setNewsFilterIndex] = useState(NEWS_CONSTANTS.DEFAULT_FILTER_INDEX);

  const onFilterSelect = (selectedVal, selectedIndex) => {
    setNewsFilterIndex(selectedIndex);
    onFilterChange && onFilterChange(selectedVal);
  };

  const onEndReached = () => {
    const filter = NEWS_CONSTANTS.FILTERS[newsFilterIndex].value;
    fetchMore && fetchMore(filter);
  };

  return (
    <>
      <DropDown
        onSelect={onFilterSelect}
        selectedIndex={newsFilterIndex}
        options={NEWS_CONSTANTS.FILTERS}
        containerStyle={STYLES.dropDown}
      />
      <InfiniteScroll
        isLoading={isLoading}
        data={news}
        numSkeletons={NEWS_CONSTANTS.NUM_TO_SHOW}
        contentContainerStyle={STYLES.newsList}
        onEndReached={onEndReached}
        isLoadingMore={isLoadingMore}
        hasMoreToFetch={hasMoreToFetch}
        renderDataItem={renderNewsItem}
        renderSkeleton={renderNewsSkeleton}
      />
    </>
  );
};

const STYLES = StyleSheet.create({
  dropDown: {
    ...GLOBAL_STYLES.screenContainer,
    paddingVertical: 0,
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  newsList: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

export default NewsList;
