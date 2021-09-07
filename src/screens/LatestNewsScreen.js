import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import CONSTANTS from "../Constants";
import { connect } from "react-redux";
import { startNewsFetch } from "../redux/news/news.actions";
import {
  selectNewsData,
  selectIsLoadingNewsData
} from "../redux/news/news.selectors";
import NewsList from "../components/shared/NewsList";

const LatestNewsScreen = ({ isLoading, newsData, fetchNews }) => {
  const [selectedFilter, setSelectedFilter] = useState(
    CONSTANTS.LATEST_NEWS.DEFAULT_FILTER
  );

  useEffect(() => {
    // fetchNews();
  }, []);

  const fetchNewsWithFilter = (selectedFilter) => {
    fetchNews(selectedFilter);
    setSelectedFilter(selectedFilter);
  };

  return (
    <View
      style={[
        GlobalStyles.screenContainer,
        styles.container,
        GlobalStyles.componentContainer
      ]}
    >
      <View style={[GlobalStyles.componentContainer]}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={fetchNewsWithFilter}
        >
          {CONSTANTS.LATEST_NEWS.FILTERS.map((filter) => (
            <Picker.Item {...filter} key={filter.label} />
          ))}
        </Picker>
      </View>
      <NewsList
        isLoading={isLoading}
        newsData={newsData}
        numSkeletonsToShow={CONSTANTS.LATEST_NEWS.NUM_NEWS_TO_SHOW}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
