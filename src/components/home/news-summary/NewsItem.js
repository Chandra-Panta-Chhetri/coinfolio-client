import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Caption } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const NewsItem = ({ item }) => (
  <TouchableNativeOpacity
    activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
    viewContainerStyle={styles.androidContainer}
  >
    <Card style={GlobalStyles.borderRadius}>
      <Card.Content style={styles.newsCardBody}>
        <View style={styles.newsInfo}>
          <Paragraph style={GlobalStyles.body2}>{item.title}</Paragraph>
          <Caption style={GlobalStyles.caption}>
            {item.publishedTime} | {item.source}
          </Caption>
        </View>
        <Card.Cover
          style={GlobalStyles.imagePreview}
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
    justifyContent: "space-between",
    alignItems: "center"
  },
  androidContainer: {
    marginTop: 10
  },
  newsInfo: {
    flex: 1,
    marginRight: 15
  }
});

export default NewsItem;
