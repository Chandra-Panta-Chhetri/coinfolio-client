import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Caption } from "react-native-paper";
import GlobalStyles from "../../../GlobalStyles";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const NewsItem = ({ item, index }) => (
  <TouchableNativeOpacity
    viewContainerStyle={index !== 0 ? styles.androidContainer : null}
  >
    <Card style={GlobalStyles.borderRadius}>
      <Card.Content style={styles.newsCardBody}>
        <View style={styles.newsInfo}>
          <Text style={GlobalStyles.body2}>{item.title}</Text>
          <Caption style={GlobalStyles.caption}>
            {item.publishedTime} | {item.source}
          </Caption>
        </View>
        <Card.Cover
          style={[GlobalStyles.imagePreview, GlobalStyles.borderRadius]}
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
