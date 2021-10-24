import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Caption } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import TouchableNativeFeedback from "../TouchableNativeFeedback";

const NewsItem = ({ item, index }) => (
  <TouchableNativeFeedback
    viewContainerStyle={index !== 0 ? styles.androidContainer : null}
  >
    <Card style={GLOBAL_STYLES.borderRadius}>
      <Card.Content style={styles.newsCardBody}>
        <View style={styles.newsInfo}>
          <Text style={TYPOGRAPHY.body2} numberOfLines={2}>
            {item.title}
          </Text>
          <Caption style={TYPOGRAPHY.caption}>
            {item.publishedTime} | {item.source}
          </Caption>
        </View>
        <Card.Cover
          style={[GLOBAL_STYLES.imagePreview, GLOBAL_STYLES.borderRadius]}
          source={{
            uri: item.imagePreview
          }}
        />
      </Card.Content>
    </Card>
  </TouchableNativeFeedback>
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
