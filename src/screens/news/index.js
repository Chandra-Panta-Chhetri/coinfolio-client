import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectNews,
  selectIsLoadingNews,
  fetchNews,
  selectIsLoadingMoreNews,
  fetchMoreNews,
  selectHasMoreNews
} from "../../redux/discover";
import { News } from "../../components";

const NewsScreen = ({ fetchNews, fetchMoreNews, news, isLoadingNews, isLoadingMoreNews, hasMoreNewsToFetch }) => {
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <News
      fetchMore={fetchMoreNews}
      onFilterChange={fetchNews}
      news={news}
      hasMoreToFetch={hasMoreNewsToFetch}
      isLoading={isLoadingNews}
      isLoadingMore={isLoadingMoreNews}
    />
  );
};

const mapStateToProps = (state) => ({
  isLoadingNews: selectIsLoadingNews(state),
  news: selectNews(state),
  isLoadingMoreNews: selectIsLoadingMoreNews(state),
  hasMoreNewsToFetch: selectHasMoreNews(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (filter) => dispatch(fetchNews(filter)),
  fetchMoreNews: (filter) => dispatch(fetchMoreNews({ filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
