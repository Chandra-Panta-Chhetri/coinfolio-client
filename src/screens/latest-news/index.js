import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { LATEST_NEWS_CONSTANTS } from "../../constants";
import { connect } from "react-redux";
import {
  selectNews,
  selectIsLoadingNews,
  startNewsFetch,
  selectIsLoadingMoreNews,
  startNextNewsFetch,
  selectHasMoreNews
} from "../../redux/news";
import { NewsList, DropDown } from "../../shared-components";

const LatestNewsScreen = ({ isLoading, news, fetchInitialNews, fetchMoreNews, isLoadingMore, hasMoreToFetch }) => {
  const [newsFilterIndex, setNewsFilterIndex] = useState(LATEST_NEWS_CONSTANTS.DEFAULT_FILTER_INDEX);

  useEffect(() => {
    fetchInitialNews();
  }, []);

  const onFilterSelect = (selectedVal, selectedIndex) => {
    setNewsFilterIndex(selectedIndex);
    fetchInitialNews(selectedVal);
  };

  const onEndReached = () => {
    const filter = LATEST_NEWS_CONSTANTS.FILTERS[newsFilterIndex].value;
    fetchMoreNews(filter);
  };

  return (
    <>
      <DropDown
        onSelect={onFilterSelect}
        selectedIndex={newsFilterIndex}
        options={LATEST_NEWS_CONSTANTS.FILTERS}
        containerStyle={STYLES.dropDownContainer}
      />
      <NewsList
        isLoading={isLoading}
        news={news}
        numSkeletonsToShow={LATEST_NEWS_CONSTANTS.NUM_TO_SHOW}
        contentContainerStyle={STYLES.newsListContentContainer}
        onEndReached={onEndReached}
        isLoadingMore={isLoadingMore}
        hasMoreToFetch={hasMoreToFetch}
      />
    </>
  );
};

const STYLES = StyleSheet.create({
  dropDownContainer: {
    marginBottom: GLOBAL_STYLES.componentContainer.marginBottom - 1,
    marginHorizontal: GLOBAL_STYLES.screenContainer.paddingHorizontal
  },
  newsListContentContainer: {
    paddingTop: 0,
    ...GLOBAL_STYLES.screenContainer
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

export default connect(mapStateToProps, mapDispatchToProps)(LatestNewsScreen);
