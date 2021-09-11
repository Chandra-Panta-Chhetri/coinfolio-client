import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
  const [selectedFilter, setSelectedFilter] = useState(
    CONSTANTS.LATEST_NEWS.DEFAULT_FILTER
  );

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNewsWithFilter = (selectedFilter) => {
    fetchNews(selectedFilter);
    setSelectedFilter(selectedFilter);
  };

  return (
    <>
      <View style={styles.dropDownContainer}>
        <DropDown />
      </View>
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
    ...GlobalStyles.screenContainer,
    paddingVertical: 0
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
