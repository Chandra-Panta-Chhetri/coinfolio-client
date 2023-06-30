import React, { useEffect, useState } from "react";
import { GLOBAL_STYLES } from "../../styles";
import { AsyncFlatList } from "../../components";
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
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getTrendingSearches();
    getRecentSearches();
  }, []);

  return (
    <AsyncFlatList
      isLoading={isLoadingSearchResults}
      data={searchResults}
      numSkeletons={MARKET_OVERVIEW_FILTERS.NUM_SKELETON_LOADERS}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      ListHeaderComponent={<Header keyword={keyword} setKeyword={setKeyword} />}
      renderDataItem={renderSearchResult}
      renderSkeleton={renderSkeleton}
      displayNoResultsInHeader
      displayNoResults={keyword !== "" && searchResults?.length === 0}
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
