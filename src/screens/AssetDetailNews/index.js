import React, { useEffect } from "react";
import { News } from "../../components";
import { connect } from "react-redux";
import {
  selectAssetNews,
  selectHasMoreAssetNews,
  selectIsLoadingAssetNews,
  selectIsLoadingMoreAssetNews,
  fetchAssetNews,
  fetchMoreAssetNews
} from "../../redux/asset-detail";

const AssetDetailNewsScreen = ({
  news,
  hasMoreNewsToFetch,
  isLoadingNews,
  isLoadingMoreNews,
  fetchNews,
  fetchMoreNews,
  route
}) => {
  const { params } = route;

  useEffect(() => {
    fetchNews({ currencies: params?.symbol });
  }, []);

  const fetchMore = (filter) => fetchMoreNews({ filter, currencies: params?.symbol });

  const onFilterChange = (filter) => fetchNews({ filter, currencies: params?.symbol });

  return (
    <News
      isLoading={isLoadingNews}
      hasMoreToFetch={hasMoreNewsToFetch}
      isLoadingMore={isLoadingMoreNews}
      onFilterChange={onFilterChange}
      fetchMore={fetchMore}
      news={news}
    />
  );
};

const mapStateToProps = (state) => ({
  news: selectAssetNews(state),
  hasMoreNewsToFetch: selectHasMoreAssetNews(state),
  isLoadingNews: selectIsLoadingAssetNews(state),
  isLoadingMoreNews: selectIsLoadingMoreAssetNews(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (query) => dispatch(fetchAssetNews(query)),
  fetchMoreNews: (query) => dispatch(fetchMoreAssetNews(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailNewsScreen);
