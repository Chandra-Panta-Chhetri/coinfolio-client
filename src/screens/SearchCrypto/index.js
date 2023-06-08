import React, { useEffect } from "react";
import { GLOBAL_STYLES } from "../../styles";
import { InfiniteScroll } from "../../components";
import { connect } from "react-redux";
import { SearchResult, Header } from "./components";
import {
  selectSearchResults,
  fetchTrendingSearches,
  fetchRecentSearches,
  selectIsLoadingSearchResults
} from "../../redux/market";
import { GLOBAL_CONSTANTS } from "../../constants";
import MARKET_OVERVIEW_FILTERS from "../MarketOverview/filters";

const renderSearchResult = ({ item }) => <SearchResult search={item} key={item?.id} />;

const renderSkeleton = ({ index }) => (
  <SearchResult.Skeleton
    customStyles={{
      marginBottom: index !== MARKET_OVERVIEW_FILTERS.NUM_SKELETON_LOADERS - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0
    }}
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
      data={searchResults}
      numSkeletons={MARKET_OVERVIEW_FILTERS.NUM_SKELETON_LOADERS}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      ListHeaderComponent={<Header />}
      renderDataItem={renderSearchResult}
      renderSkeleton={renderSkeleton}
    />
  );
};

const mapStateToProps = (state) => ({
  searchResults: selectSearchResults(state),
  isLoadingSearchResults: selectIsLoadingSearchResults(state)
});

const mapDispatchToProps = (dispatch) => ({
  getTrendingSearches: () => dispatch(fetchTrendingSearches()),
  getRecentSearches: () => dispatch(fetchRecentSearches())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCryptoScreen);
