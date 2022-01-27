import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { NEWS_CONSTANTS } from "../../constants";
import { connect } from "react-redux";
import {
  selectNews,
  selectIsLoadingNews,
  startNewsFetch,
  selectIsLoadingMoreNews,
  startNextNewsFetch,
  selectHasMoreNews
} from "../../redux/news";
import { DropDown, InfiniteScroll, NewsItemSkeleton, NewsItem } from "../../shared-components";

const renderNewsSkeleton = ({ index }) => (
  <NewsItemSkeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const renderNewsItem = ({ item, index }) => (
  <NewsItem key={item.id.toString()} news={item} containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const NewsScreen = ({ isLoading, news, fetchInitialNews, fetchMoreNews, isLoadingMore, hasMoreToFetch }) => {
  const [newsFilterIndex, setNewsFilterIndex] = useState(NEWS_CONSTANTS.DEFAULT_FILTER_INDEX);

  useEffect(() => {
    fetchInitialNews();
  }, []);

  const onFilterSelect = (selectedVal, selectedIndex) => {
    setNewsFilterIndex(selectedIndex);
    fetchInitialNews(selectedVal);
  };

  const onEndReached = () => {
    const filter = NEWS_CONSTANTS.FILTERS[newsFilterIndex].value;
    fetchMoreNews(filter);
  };

  return (
    <>
      <DropDown
        onSelect={onFilterSelect}
        selectedIndex={newsFilterIndex}
        options={NEWS_CONSTANTS.FILTERS}
        containerStyle={STYLES.dropDownContainer}
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
  dropDownContainer: {
    marginBottom: GLOBAL_STYLES.componentContainer.marginBottom - 1,
    marginHorizontal: GLOBAL_STYLES.screenContainer.paddingHorizontal
  },
  newsList: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

const mapStateToProps = (state) => ({
  isLoading: selectIsLoadingNews(state),
  news: selectNews(state),
  isLoadingMore: selectIsLoadingMoreNews(state),
  hasMoreToFetch: selectHasMoreNews(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialNews: (filter) => dispatch(startNewsFetch(filter)),
  fetchMoreNews: (filter) => dispatch(startNextNewsFetch({ filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
