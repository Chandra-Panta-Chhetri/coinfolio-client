import React, { useEffect } from "react";
import { View } from "react-native";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectNewsSummary, selectIsLoadingSummary, startNewsSummaryFetch } from "../../../redux/summary";
import { NewsItemSkeleton, NewsItem } from "../../../shared-components";
import { GLOBAL_STYLES } from "../../../styles";

const NUM_SKELETON = 4;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const NewsSummaries = ({ news, isLoading, fetchNewsSummary }) => {
  const navigation = useNavigation();
  const toNewsScreen = () => navigation.navigate("News");

  useEffect(() => {
    fetchNewsSummary();
  }, []);

  return (
    <View>
      <HeadingWithSeeAll title="News" onSeeAllPress={toNewsScreen} />
      {isLoading && news.length === 0
        ? DUMMY_SKELETON_ARRAY.map((_, i) => (
            <NewsItemSkeleton key={i} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
          ))
        : news.map((n, i) => (
            <NewsItem news={n} key={n.title} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
          ))}
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
