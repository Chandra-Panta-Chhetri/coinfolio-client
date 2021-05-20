import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import {
  selectNewsSummary,
  selectIsLoadingSummary
} from "../redux/summary/summary.selectors";
import { startNewsSummaryFetch } from "../redux/summary/summary.actions";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./NewsCardSkeleton";

const NUM_SKELETON_TO_SHOW = 3;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON_TO_SHOW).fill("1");

const NewsSummary = ({ navigation, news, isLoading, fetchNewsSummary }) => {
  const navigateToNewsScreen = () => navigation.navigate("News");

  return (
    <View style={styles.container}>
      <HeadingWithSeeAll
        headingTitle="News"
        onSeeAllBtnPress={navigateToNewsScreen}
      />
      <FlatList
        style={styles.newsContainer}
        data={news}
        keyExtractor={(n) => n.title}
        renderItem={(props) => <NewsCard {...props} />}
        scrollEnabled={false}
        listKey="NewsSummaryList"
      />
      {isLoading && news.length === 0 && (
        <FlatList
          style={styles.newsContainer}
          data={DUMMY_SKELETON_ARRAY}
          keyExtractor={(s, index) => s + index}
          renderItem={() => <NewsCardSkeleton />}
          scrollEnabled={false}
          listKey="NewsSummarySkeletonList"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  newsContainer: {
    marginTop: 10
  }
});

const mapStateToProps = (state) => ({
  news: selectNewsSummary(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsSummary: () => dispatch(startNewsSummaryFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(NewsSummary));
