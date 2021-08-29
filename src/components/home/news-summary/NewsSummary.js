import React from "react";
import { View, FlatList } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  selectNewsSummary,
  selectIsLoadingSummary
} from "../../../redux/summary/summary.selectors";
import { startNewsSummaryFetch } from "../../../redux/summary/summary.actions";
import NewsItem from "./NewsItem";
import NewsItemSkeleton from "./NewsItemSkeleton";
import CONSTANTS from "../../../Constants";

const NewsSummary = ({ navigation, news, isLoading, fetchNewsSummary }) => {
  const navigateToNewsScreen = () => navigation.navigate("News");
  const dummySkeletonArray = Array(
    CONSTANTS.NEWS_SUMMARY.NUM_SKELETON_TO_SHOW
  ).fill("1");

  return (
    <View>
      <HeadingWithSeeAll
        headingTitle="News"
        onSeeAllBtnPress={navigateToNewsScreen}
      />
      <FlatList
        data={news}
        keyExtractor={(n) => n.title}
        renderItem={(props) => <NewsItem {...props} />}
        scrollEnabled={false}
        listKey="NewsSummaryList"
      />
      {isLoading && news.length === 0 && (
        <FlatList
          data={dummySkeletonArray}
          keyExtractor={(s, index) => s + index}
          renderItem={() => <NewsItemSkeleton />}
          scrollEnabled={false}
          listKey="NewsSummarySkeletonList"
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  news: selectNewsSummary(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsSummary: () => dispatch(startNewsSummaryFetch())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(NewsSummary);
