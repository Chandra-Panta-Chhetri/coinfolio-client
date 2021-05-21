import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Paragraph, Caption } from "react-native-paper";

const NewsCard = ({ item }) => (
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

const styles = StyleSheet.create({
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
    marginRight: 15
  },
  newsImagePreview: {
    width: 90,
    height: 90
  }
});

export default NewsCard;
