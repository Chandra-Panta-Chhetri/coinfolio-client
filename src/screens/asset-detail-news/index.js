import React, { useEffect } from "react";
import { NewsList } from "../../shared-components";
import { connect } from "react-redux";
import {
  selectAssetNews,
  selectHasMoreAssetNews,
  selectIsLoadingAssetNews,
  selectIsLoadingMoreAssetNews,
  startAssetNewsFetch,
  startNextAssetNewsFetch
} from "../../redux/asset-detail";

const AssetDetailNewsScreen = ({ news, hasMoreToFetch, isLoading, isLoadingMore, fetchNews, fetchMoreNews, route }) => {
  const { params } = route;

  useEffect(() => {
    fetchNews({ currencies: params.symbol });
  }, []);

  const fetchMore = (filter) => fetchMoreNews({ filter, currencies: params.symbol });

  const onFilterChange = (filter) => fetchNews({ filter, currencies: params.symbol });

  return (
    <NewsList
      isLoading={isLoading}
      hasMoreToFetch={hasMoreToFetch}
      isLoadingMore={isLoadingMore}
      onFilterChange={onFilterChange}
      fetchMore={fetchMore}
      news={news}
    />
  );
};

const mapStateToProps = (state) => ({
  news: selectAssetNews(state),
  hasMoreToFetch: selectHasMoreAssetNews(state),
  isLoading: selectIsLoadingAssetNews(state),
  isLoadingMore: selectIsLoadingMoreAssetNews(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (query) => dispatch(startAssetNewsFetch(query)),
  fetchMoreNews: (query) => dispatch(startNextAssetNewsFetch(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailNewsScreen);
