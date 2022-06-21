import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import TouchableNativeFeedback from "../TouchableNativeFeedback";
import * as Linking from "expo-linking";
import { GLOBAL_CONSTANTS } from "../../constants";

const formatDate = (isoString) => new Date(isoString).toDateString();

class NewsItem extends PureComponent {
  onNewsPress = () => {
    const { news } = this.props;
    Linking.openURL(news.url);
  };

  render() {
    const { news, containerStyle } = this.props;
    return (
      <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={this.onNewsPress}>
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
  }
}

const STYLES = StyleSheet.create({
  newsInfo: {
    flex: 1,
    marginRight: GLOBAL_CONSTANTS.LG_MARGIN
  },
  dateSourceContainer: {
    marginTop: GLOBAL_CONSTANTS.SM_MARGIN,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default NewsItem;
