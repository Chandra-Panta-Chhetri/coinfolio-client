import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { InfiniteScroll, Skeleton } from "../../shared-components";
import { connect } from "react-redux";
import { SearchItem, Header } from "./components";
import {
  selectSearchResults,
  startTrendingSearchesFetch,
  startRecentSearchesFetch,
  selectIsLoadingSearchResults
} from "../../redux/market";
import { MARKET_OVERVIEW_CONSTANTS } from "../../constants";

const renderSearchResult = ({ item }) => <SearchItem search={item} key={item.id} />;

const renderSkeleton = ({ index }) => (
  <Skeleton
    style={[
      STYLES.searchSkeleton,
      {
        marginBottom:
          index !== MARKET_OVERVIEW_CONSTANTS.NUM_SEARCH_RESULT_SKELETONS - 1
            ? GLOBAL_STYLES.smMarginBottom.marginBottom
            : 0
      }
    ]}
  />
);

const SearchCryptoScreen = ({ searchResults, getTrendingSearches, getRecentSearches, isLoadingSearchResults }) => {
  useEffect(() => {
    getTrendingSearches();
    getRecentSearches();
  }, []);

  return (
    <InfiniteScroll
      isLoading={isLoadingSearchResults}
      isLoadingMore={false}
      data={searchResults}
      numSkeletons={MARKET_OVERVIEW_CONSTANTS.NUM_SEARCH_RESULT_SKELETONS}
      hasMoreToFetch={false}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      ListHeaderComponent={<Header />}
      renderDataItem={renderSearchResult}
      renderSkeleton={renderSkeleton}
    />
  );
};

const STYLES = StyleSheet.create({
  searchSkeleton: {
    width: "100%",
    height: 60
  }
});

const mapStateToProps = (state) => ({
  searchResults: selectSearchResults(state),
  isLoadingSearchResults: selectIsLoadingSearchResults(state)
});

const mapDispatchToProps = (dispatch) => ({
  getTrendingSearches: () => dispatch(startTrendingSearchesFetch()),
  getRecentSearches: () => dispatch(startRecentSearchesFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCryptoScreen);
