import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { TouchableNativeFeedback, IconImage } from "../../../../components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { formatPercent, formatPrice, getStylesBasedOnSign } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import SCREEN_NAMES from "../../../../navigators/screen-names";
import { Skeleton } from "../../../../components";

const TopCoin = ({ coin }) => {
  const navigation = useNavigation();
  const { symbol, priceUsd, changePercent24Hr, image, name, id } = coin;

  const goToAssetDetail = () => navigation.navigate(SCREEN_NAMES.ASSET_DETAIL, { image, symbol, name, id });

  return (
    <TouchableNativeFeedback viewContainerStyle={STYLES.androidContainer} onPress={goToAssetDetail}>
      <Card style={STYLES.topCoinCard}>
        <Card.Content>
          <IconImage
            source={{
              uri: image
            }}
          />
          <Text style={TYPOGRAPHY.body2}>{symbol}</Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
            {formatPrice(priceUsd)}
          </Text>
          <Text numberOfLines={1} style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
            {formatPercent(changePercent24Hr)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

export const TopCoinSkeleton = () => (
  <Card style={STYLES.cardContainer}>
    <Card.Content>
      <Skeleton style={STYLES.icon} />
      <Skeleton style={STYLES.symbol} />
      <Skeleton style={STYLES.price} count={2} />
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  topCoinCard: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 125
  },
  androidContainer: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN,
    width: 125
  },
  symbol: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 50,
    height: 10,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  price: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 100,
    height: 10,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE
  }
});

export default memo(TopCoin);
