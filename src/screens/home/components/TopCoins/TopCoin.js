import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { TouchableNativeFeedback } from "../../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatNumBasedOnSignWorklet } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";

const TopCoin = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback viewContainerStyle={STYLES.androidContainer}>
      <Card style={STYLES.topCoinCard}>
        <Card.Content>
          <Avatar.Image
            size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <Text style={TYPOGRAPHY.body2}>{item.symbol}</Text>
          <Text style={TYPOGRAPHY.body1}>${item.priceUsd}</Text>
          <Text style={[TYPOGRAPHY.body1, getStylesBasedOnSign(item.changePercent24Hr)]}>
            {formatNumBasedOnSignWorklet(item.changePercent24Hr)}%
          </Text>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  topCoinCard: {
    ...GLOBAL_STYLES.borderRadius,
    width: 125
  },
  androidContainer: {
    marginRight: 7
  }
});

export default TopCoin;
