import React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";
import GlobalStyles from "../../../GlobalStyles";
import {
  getStylesBasedOnPosOrNeg,
  appendPlusOrMinus
} from "../../../GlobalUtils";

const TopCoin = ({ item, navigation }) => {
  return (
    <TouchableNativeOpacity
      activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
      viewContainerStyle={styles.androidContainer}
    >
      <Card style={[GlobalStyles.borderRadius, styles.topCoinCard]}>
        <Card.Content>
          <Avatar.Image
            size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <Paragraph style={[GlobalStyles.body2]}>{item.ticker}</Paragraph>
          <Paragraph style={[GlobalStyles.body1]}>${item.price}</Paragraph>
          <Paragraph
            style={[
              GlobalStyles.body1,
              getStylesBasedOnPosOrNeg(item.percentChange)
            ]}
          >
            {appendPlusOrMinus(item.percentChange)}%
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableNativeOpacity>
  );
};

const styles = StyleSheet.create({
  topCoinCard: {
    width: 125
  },
  androidContainer: {
    marginRight: 10
  }
});

export default TopCoin;
