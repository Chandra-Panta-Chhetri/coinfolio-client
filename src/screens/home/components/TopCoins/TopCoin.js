import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { TouchableNativeFeedback } from "../../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatNumBasedOnSign } from "../../../../utils";

const TopCoin = ({ item, navigation }) => {
  return (
    <TouchableNativeFeedback viewContainerStyle={styles.androidContainer}>
      <Card style={styles.topCoinCard}>
        <Card.Content>
          <Avatar.Image
            size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <Text style={TYPOGRAPHY.body2}>{item.ticker}</Text>
          <Text style={TYPOGRAPHY.body1}>${item.price}</Text>
          <Text
            style={[TYPOGRAPHY.body1, getStylesBasedOnSign(item.percentChange)]}
          >
            {formatNumBasedOnSign(item.percentChange)}%
          </Text>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  topCoinCard: {
    ...GLOBAL_STYLES.borderRadius,
    width: 125
  },
  androidContainer: {
    marginRight: 7
  }
});

export default TopCoin;
