import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { IconImage, OutlinedText, TouchableNativeFeedback, Skeleton } from "../../../components";
import { formatPercent, formatPrice, getStylesBasedOnSign } from "../../../utils";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../constants";
import SCREEN_NAMES from "../../../navigators/screen-names";

const CoinOverview = ({ item }) => {
  const { changePercent24Hr, name, priceUsd, image, rank, marketCap, id, symbol } = item;
  const navigation = useNavigation();

  const onPress = () => navigation?.navigate(SCREEN_NAMES.ASSET_DETAIL, { image, symbol, id, name });

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[STYLES.container]}>
        <IconImage
          source={{
            uri: image
          }}
        />
        <View style={STYLES.rankNamePercentChange}>
          <View style={STYLES.rankName}>
            <OutlinedText text={rank} style={STYLES.rank} />
            <Text numberOfLines={1} style={TYPOGRAPHY.body2}>
              {name}
            </Text>
          </View>
          <Text numberOfLines={1} style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
            {formatPercent(changePercent24Hr)}
          </Text>
        </View>
        <View style={STYLES.priceMarketCap}>
          <Text numberOfLines={1} style={TYPOGRAPHY.body2}>
            {formatPrice(priceUsd)}
          </Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
            MCap {marketCap}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export const CoinOverviewSkeleton = ({ customStyle }) => <Skeleton style={[STYLES.itemSkeleton, customStyle]} />;

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  rankNamePercentChange: { flex: 0.7, marginLeft: GLOBAL_CONSTANTS.SM_MARGIN },
  rankName: { flexDirection: "row", alignItems: "center" },
  rank: {
    ...TYPOGRAPHY.caption,
    marginRight: GLOBAL_CONSTANTS.SM_MARGIN
  },
  priceMarketCap: {
    alignItems: "flex-end",
    flex: 1
  },
  itemSkeleton: {
    width: "100%",
    height: 60
  }
});

export default memo(CoinOverview);
