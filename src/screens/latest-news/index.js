import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { LATEST_NEWS_CONSTANTS } from "../../constants";
import { connect } from "react-redux";
import { selectNewsData, selectIsLoadingNewsData, startNewsFetch } from "../../redux/news";
import { NewsList, DropDown } from "../../shared-components";

const LatestNewsScreen = ({ isLoading, news, fetchNews }) => {
  const [newsFilterIndex, setNewsFilterIndex] = useState(LATEST_NEWS_CONSTANTS.DEFAULT_FILTER_INDEX);

  useEffect(() => {
    fetchNews();
  }, []);

  const onFilterSelect = (selectedVal, selectedIndex) => {
    setNewsFilterIndex(selectedIndex);
    fetchNews(selectedVal);
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
        numSkeletonsToShow={12}
        scrollEnabled
        contentContainerStyle={STYLES.newsListContentContainer}
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
  isLoading: selectIsLoadingNewsData(state),
  news: selectNewsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (filter) => dispatch(startNewsFetch(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestNewsScreen);
