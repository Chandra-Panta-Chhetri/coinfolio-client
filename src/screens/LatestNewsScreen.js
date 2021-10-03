import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import GlobalStyles from "../GlobalStyles";
import CONSTANTS from "../Constants";
import { connect } from "react-redux";
import { startNewsFetch } from "../redux/news/news.actions";
import {
  selectNewsData,
  selectIsLoadingNewsData
} from "../redux/news/news.selectors";
import NewsList from "../components/shared/NewsList";
import DropDown from "../components/shared/DropDown";

const LatestNewsScreen = ({ isLoading, newsData, fetchNews }) => {
  useEffect(() => {
    fetchNews();
  }, []);

  const onFilterSelect = (selectedVal, selectedIndex) => {
    setNewsFilterIndex(selectedIndex);
    fetchNews(selectedVal);
  };

  const [newsFilterIndex, setNewsFilterIndex] = useState(
    CONSTANTS.LATEST_NEWS.DEFAULT_FILTER_INDEX
  );

  return (
    <>
      <DropDown
        onSelect={onFilterSelect}
        selectedIndex={newsFilterIndex}
        options={CONSTANTS.LATEST_NEWS.FILTERS}
        containerStyle={styles.dropDownContainer}
      />
      <NewsList
        isLoading={isLoading}
        newsData={newsData}
        numSkeletonsToShow={CONSTANTS.LATEST_NEWS.NUM_NEWS_TO_SHOW}
        scrollEnabled
        contentContainerStyle={styles.newsListContentContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    ...GlobalStyles.componentContainer,
    marginHorizontal: GlobalStyles.screenContainer.paddingHorizontal
  },
  newsListContentContainer: {
    ...GlobalStyles.screenContainer,
    paddingTop: 0
  }
});

const mapStateToProps = (state) => ({
  isLoading: selectIsLoadingNewsData(state),
  newsData: selectNewsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (filter) => dispatch(startNewsFetch(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestNewsScreen);
