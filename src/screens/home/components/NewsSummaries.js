import React, { useEffect } from "react";
import { View } from "react-native";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectNewsSummary,
  selectIsLoadingSummary,
  startNewsSummaryFetch
} from "../../../redux/summary";
import { NewsList } from "../../../shared-components";

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
      <NewsList isLoading={isLoading} newsData={news} numSkeletonsToShow={3} />
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
