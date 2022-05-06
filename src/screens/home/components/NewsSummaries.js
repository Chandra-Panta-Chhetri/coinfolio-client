import React, { useEffect } from "react";
import { View } from "react-native";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectNewsSummary,
  startNewsSummaryFetch,
  MAX_NEWS_SUMMARIES,
  selectIsLoadingNewsSummary
} from "../../../redux/summary";
import { NewsItemSkeleton, NewsItem } from "../../../shared-components";
import { GLOBAL_STYLES } from "../../../styles";

const DUMMY_SKELETON_ARRAY = Array(MAX_NEWS_SUMMARIES).fill("1");

const NewsSummaries = ({ news, isLoading, fetchNewsSummary }) => {
  const navigation = useNavigation();
  const toNewsScreen = () => navigation.navigate("Discover", { screen: "News" });

  useEffect(() => {
    fetchNewsSummary();
  }, []);

  return (
    <View>
      <HeadingWithSeeAll title="News" onSeeAllPress={toNewsScreen} />
      <View>
        {isLoading || news.length === 0
          ? DUMMY_SKELETON_ARRAY.map((_, i) => (
              <NewsItemSkeleton key={i} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))
          : news.map((n, i) => (
              <NewsItem news={n} key={n.title} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  news: selectNewsSummary(state),
  isLoading: selectIsLoadingNewsSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsSummary: () => dispatch(startNewsSummaryFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsSummaries);
