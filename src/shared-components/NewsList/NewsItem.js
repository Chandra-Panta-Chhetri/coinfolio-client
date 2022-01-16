import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import TouchableNativeFeedback from "../TouchableNativeFeedback";
import * as Linking from "expo-linking";

const formatDate = (isoString) => new Date(isoString).toDateString();

const areEqual = () => true;

const NewsItem = ({ news, containerStyle }) => {
  const onNewsPress = () => {
    Linking.openURL(news.url);
  };

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={onNewsPress}>
      <Card style={GLOBAL_STYLES.borderRadius}>
        <Card.Content>
          <Text style={TYPOGRAPHY.body2} numberOfLines={2}>
            {news.title}
          </Text>
          <View style={STYLES.dateSourceContainer}>
            <Text style={TYPOGRAPHY.caption}>{news.source}</Text>
            <Text style={TYPOGRAPHY.caption}>{formatDate(news.published)}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  newsInfo: {
    flex: 1,
    marginRight: 15
  },
  dateSourceContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default memo(NewsItem, areEqual);
