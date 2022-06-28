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

const NewsScreen = ({ fetchInitialNews, fetchMoreNews, ...otherProps }) => {
  useEffect(() => {
    fetchInitialNews();
  }, []);

  return <NewsList fetchMore={fetchMoreNews} onFilterChange={fetchInitialNews} {...otherProps} />;
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoadingNews(state),
  news: selectNews(state),
  isLoadingMore: selectIsLoadingMoreNews(state),
  hasMoreToFetch: selectHasMoreNews(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialNews: (filter) => dispatch(startNewsFetch(filter)),
  fetchMoreNews: (filter) => dispatch(startNextNewsFetch({ filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
