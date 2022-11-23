import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { TouchableNativeFeedback, IconImage } from "../../../../shared-components";
import { TYPOGRAPHY } from "../../../../styles";
import { formatPercentWorklet, getStylesBasedOnSign } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const TopCoin = ({ coin }) => {
  const navigation = useNavigation();
  const { symbol, priceUsd, changePercent24Hr, image, name, id } = coin;

  const onPress = () => navigation.navigate("AssetDetail", { image, symbol, name, id });

  // console.log("TOP COIN RENDERING", coin.id);

  return (
    <TouchableNativeFeedback viewContainerStyle={STYLES.androidContainer} onPress={onPress}>
      <Card style={STYLES.topCoinCard}>
        <Card.Content>
          <IconImage
            source={{
              uri: image
            }}
          />
          <Text style={TYPOGRAPHY.body2}>{symbol}</Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
            {priceUsd}
          </Text>
          <Text numberOfLines={1} style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
            {formatPercentWorklet(changePercent24Hr)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  topCoinCard: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 125
  },
  androidContainer: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default memo(TopCoin);
