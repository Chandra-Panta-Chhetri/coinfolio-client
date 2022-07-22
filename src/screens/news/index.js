import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectNews,
  selectIsLoadingNews,
  startNewsFetch,
  selectIsLoadingMoreNews,
  startNextNewsFetch,
  selectHasMoreNews
} from "../../redux/discover";
import { NewsList } from "../../shared-components";

const NewsScreen = ({ fetchNews, fetchMoreNews, ...otherProps }) => {
  useEffect(() => {
    fetchNews();
  }, []);

  return <NewsList fetchMore={fetchMoreNews} onFilterChange={fetchNews} {...otherProps} />;
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoadingNews(state),
  news: selectNews(state),
  isLoadingMore: selectIsLoadingMoreNews(state),
  hasMoreToFetch: selectHasMoreNews(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (filter) => dispatch(startNewsFetch(filter)),
  fetchMoreNews: (filter) => dispatch(startNextNewsFetch({ filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
