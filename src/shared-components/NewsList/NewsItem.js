import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Caption } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import TouchableNativeFeedback from "../TouchableNativeFeedback";

const NewsItem = ({ news, containerStyle }) => (
  <TouchableNativeFeedback viewContainerStyle={containerStyle}>
    <Card style={GLOBAL_STYLES.borderRadius}>
      <Card.Content style={STYLES.newsCardBody}>
        <View style={STYLES.newsInfo}>
          <Text style={TYPOGRAPHY.body2} numberOfLines={2}>
            {news.title}
          </Text>
          <Caption style={TYPOGRAPHY.caption}>
            {news.publishedTime} | {news.source}
          </Caption>
        </View>
        <Card.Cover
          style={[GLOBAL_STYLES.imagePreview, GLOBAL_STYLES.borderRadius]}
          source={{
            uri: news.imagePreview
          }}
        />
      </Card.Content>
    </Card>
  </TouchableNativeFeedback>
);

const STYLES = StyleSheet.create({
  newsCardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  newsInfo: {
    flex: 1,
    marginRight: 15
  }
});

export default NewsItem;
