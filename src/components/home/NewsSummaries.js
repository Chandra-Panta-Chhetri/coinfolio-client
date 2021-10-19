import React, { useEffect } from "react";
import { View } from "react-native";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectNewsSummary,
  selectIsLoadingSummary
} from "../../redux/summary/summary.selectors";
import { startNewsSummaryFetch } from "../../redux/summary/summary.actions";
import CONSTANTS from "../../Constants";
import NewsList from "../shared/NewsList";

const NewsSummaries = ({ news, isLoading, fetchNewsSummary }) => {
  const navigation = useNavigation();
  const navigateToNewsScreen = () => navigation.navigate("News");

  useEffect(() => {
    fetchNewsSummary();
  }, []);

  return (
    <View>
      <HeadingWithSeeAll
        headingTitle="News"
        onSeeAllBtnPress={navigateToNewsScreen}
      />
      <NewsList
        isLoading={isLoading}
        newsData={news}
        numSkeletonsToShow={CONSTANTS.NEWS_SUMMARY.NUM_SKELETON_TO_SHOW}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsSummaries);
