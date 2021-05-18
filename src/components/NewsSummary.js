import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Card, Paragraph, Caption } from "react-native-paper";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import {
  selectNewsSummary,
  selectIsLoadingSummary
} from "../redux/summary/summary.selectors";
import { startNewsSummaryFetch } from "../redux/summary/summary.actions";

const NewsItem = ({ item }) => (
  <TouchableOpacity activeOpacity={0.6}>
    <Card style={styles.newsCard}>
      <Card.Content style={styles.newsCardBody}>
        <View style={styles.newsInfo}>
          <Paragraph style={styles.newsTitle}>{item.title}</Paragraph>
          <Caption style={styles.newsSubtitle}>
            {item.publishedTime} | {item.source}
          </Caption>
        </View>
        <Card.Cover
          style={styles.newsImagePreview}
          source={{
            uri: item.imagePreview
          }}
        />
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const NewsSummary = ({ navigation, news, isLoading, fetchNewsSummary }) => {
  const navigateToNewsScreen = () => navigation.navigate("News");

  if (isLoading) {
    return null;
  }

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
        renderItem={(props) => <NewsItem {...props} />}
        scrollEnabled={false}
        listKey="NewsSummaryList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  newsContainer: {
    marginTop: 10
  },
  newsCardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newsCard: {
    marginBottom: 10,
    borderRadius: 13
  },
  newsTitle: {
    fontSize: 15
  },
  newsSubtitle: {
    color: "darkgray",
    fontWeight: "bold"
  },
  newsInfo: {
    flex: 1,
    marginRight: 5
  },
  newsImagePreview: {
    width: 90,
    height: 90
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
