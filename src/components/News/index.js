import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GLOBAL_CONSTANTS } from "../../constants";
import DropDown from "../DropDown";
import InfiniteScroll from "../InfiniteScroll";
import NewsItem from "./NewsItem";
import { isNullOrUndefined } from "../../utils";
import NEWS_FILTERS from "./filters";

const renderNewsSkeleton = ({ index }) => (
  <NewsItem.Skeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const renderNewsItem = ({ item, index }) => (
  <NewsItem key={item?.id + index} news={item} containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const News = ({ isLoading, news, onFilterChange, fetchMore, isLoadingMore, hasMoreToFetch }) => {
  const [newsFilterIndex, setNewsFilterIndex] = useState(NEWS_FILTERS.SHOW_ONLY.DEFAULT_OPTION_INDEX);

  const onFilterSelect = (selectedVal, selectedIndex) => {
    setNewsFilterIndex(selectedIndex);
    if (!isNullOrUndefined(onFilterChange)) {
      onFilterChange(selectedVal);
    }
  };

  const onEndReached = () => {
    if (!isNullOrUndefined(fetchMore)) {
      const filter = NEWS_FILTERS.SHOW_ONLY.OPTIONS[newsFilterIndex]?.value;
      fetchMore(filter);
    }
  };

  return (
    <>
      <DropDown
        onSelect={onFilterSelect}
        selectedIndex={newsFilterIndex}
        options={NEWS_FILTERS.SHOW_ONLY.OPTIONS}
        containerStyle={STYLES.dropDown}
      />
      <InfiniteScroll
        isLoading={isLoading}
        data={news}
        numSkeletons={NEWS_FILTERS.NUM_SKELETON_LOADERS}
        contentContainerStyle={STYLES.news}
        onEndReached={onEndReached}
        isLoadingMore={isLoadingMore}
        hasMoreToFetch={hasMoreToFetch}
        renderDataItem={renderNewsItem}
        renderSkeleton={renderNewsSkeleton}
        displayNoResults={news?.length === 0}
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
  news: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

export default News;
