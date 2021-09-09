import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { useTheme } from "react-native-paper";

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

  const { colors } = useTheme();

  return (
    <View style={[GlobalStyles.screenContainer, styles.container]}>
      <View style={[GlobalStyles.componentContainer, { paddingTop: 25 }]}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={fetchNewsWithFilter}
          prompt="Select a filter"
          dropdownIconColor={colors.text}
          dropdownIconRippleColor={colors.touchableRipple}
        >
          {CONSTANTS.LATEST_NEWS.FILTERS.map((filter) => (
            <Picker.Item
              color={colors.text}
              style={{ borderWidth: 1 }}
              {...filter}
              key={filter.label}
            />
          ))}
        </Picker>
      </View>
      <NewsList
        isLoading={isLoading}
        newsData={newsData}
        numSkeletonsToShow={CONSTANTS.LATEST_NEWS.NUM_NEWS_TO_SHOW}
        scrollEnabled
        skeletonStyleProps={newsListStyle}
        contentStyleProps={newsListStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  skeletonContentContainer: {
    paddingBottom: GlobalStyles.screenContainer.paddingVertical
  }
});

const newsListStyle = {
  contentContainerStyle: styles.skeletonContentContainer,
  style: GlobalStyles.componentContainer
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoadingNewsData(state),
  newsData: selectNewsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (filter) => dispatch(startNewsFetch(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestNewsScreen);
