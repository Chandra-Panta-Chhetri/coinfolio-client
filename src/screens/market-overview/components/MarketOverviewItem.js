import React from "react";
import { View, StyleSheet } from "react-native";
import { IconImage } from "../../../shared-components";
import { formatNumBasedOnSignWorklet, getStylesBasedOnSign } from "../../../utils";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const MarketOverviewItem = ({ item, containerStyle = {} }) => {
  const { changePercent24Hr, name, priceUsd, image, rank, marketCap } = item;
  const { colors } = useTheme();

  return (
    <View style={[STYLES.container, containerStyle]}>
      <IconImage
        source={{
          uri: image
        }}
      />
      <View style={STYLES.rankNamePercentChange}>
        <View style={STYLES.rankName}>
          <Text style={[STYLES.rank, { borderColor: colors.text }]}>{rank}</Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body2}>
            {name}
          </Text>
        </View>
        <Text style={[getStylesBasedOnSign(changePercent24Hr), TYPOGRAPHY.body1]}>
          {formatNumBasedOnSignWorklet(changePercent24Hr)}%
        </Text>
      </View>
      <View style={STYLES.priceMarketCap}>
        <Text style={TYPOGRAPHY.body2}>${priceUsd}</Text>
        <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
          MCap {marketCap}
        </Text>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1
  },
  rankNamePercentChange: { flex: 0.7, marginLeft: 5 },
  rankName: { flexDirection: "row", alignItems: "center" },
  rank: {
    ...TYPOGRAPHY.caption,
    ...GLOBAL_STYLES.borderRadius,
    paddingHorizontal: 5,
    marginRight: 4,
    textAlign: "center",
    borderWidth: 1
  },
  priceMarketCap: {
    alignItems: "flex-end",
    flex: 1
  }
});

export default MarketOverviewItem;
