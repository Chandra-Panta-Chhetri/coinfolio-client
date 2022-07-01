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

const AssetDetailNewsScreen = ({ news, hasMoreToFetch, isLoading, isLoadingMore, fetchNews, fetchMoreNews }) => {
  useEffect(() => {
    console.log("asset detail news screen mounted");
    //fetchNews();
  }, []);

  return (
    <NewsList
      isLoading={isLoading}
      hasMoreToFetch={hasMoreToFetch}
      isLoadingMore={isLoadingMore}
      onFilterChange={fetchNews}
      fetchMore={fetchMoreNews}
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
  fetchNews: (filter) => dispatch(startAssetNewsFetch(filter)),
  fetchMoreNews: (filter) => dispatch(startNextAssetNewsFetch({ filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailNewsScreen);
