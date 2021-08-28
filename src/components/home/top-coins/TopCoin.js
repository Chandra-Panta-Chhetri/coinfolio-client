import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";
import GlobalStyles from "../../../GlobalStyles";
import {
  getStylesBasedOnPosOrNeg,
  appendPlusOrMinus
} from "../../../GlobalUtils";

const TopCoin = ({ item, navigation }) => {
  return (
    <TouchableNativeOpacity viewContainerStyle={styles.androidContainer}>
      <Card style={[GlobalStyles.borderRadius, styles.topCoinCard]}>
        <Card.Content>
          <Avatar.Image
            size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <Text style={[GlobalStyles.body2]}>{item.ticker}</Text>
          <Text style={[GlobalStyles.body1]}>${item.price}</Text>
          <Text
            style={[
              GlobalStyles.body1,
              getStylesBasedOnPosOrNeg(item.percentChange)
            ]}
          >
            {appendPlusOrMinus(item.percentChange)}%
          </Text>
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
    marginRight: 7,
    padding: 1
  }
});

export default TopCoin;
