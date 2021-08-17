import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Caption } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const NewsItem = ({ item }) => (
  <TouchableNativeOpacity
    activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
    viewContainerStyle={styles.androidContainer}
  >
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
  </TouchableNativeOpacity>
);

const styles = StyleSheet.create({
  newsCardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newsCard: {
    borderRadius: CONSTANTS.SHARED.BORDER_RADIUS
  },
  androidContainer: {
    marginBottom: 10
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
    marginRight: 15
  },
  newsImagePreview: {
    width: 90,
    height: 90
  }
});

export default NewsItem;
