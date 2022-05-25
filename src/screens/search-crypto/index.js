import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { CloseIconButton, InfiniteScroll, Skeleton } from "../../shared-components";
import { Text, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { SearchCategory } from "./components";
import {
  selectTrendingSearches,
  selectRecentSearches,
  selectSearchResults,
  startSearchResultsFetch,
  startTrendingSearchesFetch,
  startRecentSearchesFetch,
  selectIsLoadingRecentSearches,
  selectIsLoadingTrendingSearches,
  selectIsLoadingSearchResults
} from "../../redux/market";
import { MARKET_OVERVIEW_CONSTANTS } from "../../constants";

const renderSearchResult = ({ item, index }) => <Text>Search Result</Text>;

const renderSearchSkeleton = ({ index }) => (
  <Skeleton
    style={[
      STYLES.searchSkeleton,
      {
        marginBottom: index !== MARKET_OVERVIEW_CONSTANTS.NUM_SEARCH_RESULT_SKELETONS - 1 ? 6 : 0
      }
    ]}
  />
);

const SearchCryptoScreen = ({
  navigation,
  trendingSearches,
  recentSearches,
  searchResults,
  getTrendingSearches,
  getRecentSearches,
  searchByKeyword,
  isLoadingTrendingSearches,
  isLoadingRecentSearches,
  isLoadingSearchResults
}) => {
  const [keyword, setKeyword] = useState(null);
  const closeScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    getTrendingSearches();
    getRecentSearches();
  }, []);

  const clearRecentSearches = () => {};

  const ListHeaderComponent = () => (
    <>
      <View style={STYLES.container}>
        <Text style={STYLES.heading}>Search</Text>
        <CloseIconButton onPress={closeScreen} />
      </View>
      <TextInput style={STYLES.searchBar} placeholder="BTC/Bitcoin" mode="outlined" />
      {!isLoadingSearchResults && (
        <SearchCategory label="Trending" searches={trendingSearches} isLoading={isLoadingTrendingSearches} />
      )}
      {!isLoadingSearchResults && (
        <SearchCategory
          label="History"
          searches={recentSearches}
          onHeadingClick={clearRecentSearches}
          headingBtnLabel="Clear"
          isLoading={isLoadingRecentSearches}
        />
      )}
    </>
  );

  return (
    <InfiniteScroll
      isLoading={isLoadingSearchResults}
      isLoadingMore={false}
      data={searchResults}
      numSkeletons={MARKET_OVERVIEW_CONSTANTS.NUM_SEARCH_RESULT_SKELETONS}
      hasMoreToFetch={false}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      ListHeaderComponent={ListHeaderComponent}
      renderDataItem={renderSearchResult}
      renderSkeleton={renderSearchSkeleton}
    />
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heading: {
    ...TYPOGRAPHY.display1
  },
  searchBar: { ...GLOBAL_STYLES.componentContainer },
  searchSkeleton: {
    width: "100%",
    height: 60
  }
});

const mapStateToProps = (state) => ({
  trendingSearches: selectTrendingSearches(state),
  recentSearches: selectRecentSearches(state),
  searchResults: selectSearchResults(state),
  isLoadingRecentSearches: selectIsLoadingRecentSearches(state),
  isLoadingTrendingSearches: selectIsLoadingTrendingSearches(state),
  isLoadingSearchResults: selectIsLoadingSearchResults(state)
});

const mapDispatchToProps = (dispatch) => ({
  getTrendingSearches: () => dispatch(startTrendingSearchesFetch()),
  getRecentSearches: () => dispatch(startRecentSearchesFetch()),
  searchByKeyword: (keyword) => dispatch(startSearchResultsFetch(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCryptoScreen);
