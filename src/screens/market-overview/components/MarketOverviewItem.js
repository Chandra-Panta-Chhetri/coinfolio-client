import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { IconImage, OutlinedText, TouchableNativeFeedback } from "../../../shared-components";
import { formatPercentWorklet, getStylesBasedOnSign } from "../../../utils";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const MarketOverviewItem = ({ item }) => {
  const { changePercent24Hr, name, priceUsd, image, rank, marketCap, id, symbol } = item;
  const navigation = useNavigation();

  const onPress = () => navigation.navigate("AssetDetail", { image, symbol, id, name });

  // console.log("MARKET OVERVIEW RENDERING", item.id);

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
          <Text numberOfLines={1} style={[getStylesBasedOnSign(changePercent24Hr), TYPOGRAPHY.body1]}>
            {formatPercentWorklet(changePercent24Hr)}
          </Text>
        </View>
        <View style={STYLES.priceMarketCap}>
          <Text numberOfLines={1} style={TYPOGRAPHY.body2}>
            {priceUsd}
          </Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
            MCap {marketCap}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

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
  }
});

export default memo(MarketOverviewItem);
