import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../styles";
import TouchableNativeFeedback from "../TouchableNativeFeedback";
import * as Linking from "expo-linking";
import { GLOBAL_CONSTANTS } from "../../constants";
import Skeleton from "../Skeleton";
import { formatDate } from "../../utils";

function NewsItem({ news, containerStyle }) {
  const openNews = () => Linking.openURL(news?.url);

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={openNews}>
      <Card style={STYLES.cardContainer}>
        <Card.Content>
          <Text style={TYPOGRAPHY.body2} numberOfLines={2}>
            {news?.title}
          </Text>
          <View style={STYLES.dateSourceContainer}>
            <Text style={TYPOGRAPHY.caption}>{news?.source}</Text>
            <Text style={TYPOGRAPHY.caption}>{formatDate(news?.published)}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
}

NewsItem.Skeleton = ({ containerStyle }) => (
  <Card style={[STYLES.cardContainer, containerStyle]}>
    <Card.Content>
      <Skeleton style={STYLES.titleSkeleton} />
      <View style={STYLES.dateSourceSkeletonContainer}>
        <Skeleton style={STYLES.subheadingSkeleton} count={2} />
      </View>
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  newsInfo: {
    flex: 1,
    marginRight: GLOBAL_CONSTANTS.LG_MARGIN
  },
  dateSourceContainer: {
    marginTop: GLOBAL_CONSTANTS.SM_MARGIN,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  titleSkeleton: {
    height: 20,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  subheadingSkeleton: {
    height: 20,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN,
    width: "30%",
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  dateSourceSkeletonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default NewsItem;
