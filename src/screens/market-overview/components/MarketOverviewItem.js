import React from "react";
import { View, StyleSheet } from "react-native";
import { IconImage } from "../../../shared-components";
import { formatNumBasedOnSignWorklet, getStylesBasedOnSign } from "../../../utils";
import { Text } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const MarketOverviewItem = ({ item, containerStyle = {} }) => {
  const { changePercent24Hr, name, priceUsd, symbol, image, rank, marketCap } = item;

  return (
    <View style={[STYLES.container, containerStyle]}>
      <IconImage
        source={{
          uri: image
        }}
      />
      <View style={STYLES.rankSymbolMarketCap}>
        <View style={STYLES.rankSymbol}>
          <Text style={[STYLES.rank, TYPOGRAPHY.body1]}>{rank}</Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body2}>
            {symbol}
          </Text>
        </View>
        <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
          MCap - {marketCap}
        </Text>
      </View>
      <View style={STYLES.pricePercent}>
        <Text style={TYPOGRAPHY.body2}>${priceUsd}</Text>
        <Text style={[getStylesBasedOnSign(changePercent24Hr), TYPOGRAPHY.body1]}>
          {formatNumBasedOnSignWorklet(changePercent24Hr)}%
        </Text>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  rankSymbolMarketCap: { flex: 1, marginLeft: 5 },
  rankSymbol: { flexDirection: "row", alignItems: "center" },
  rank: {
    ...GLOBAL_STYLES.borderRadius,
    borderWidth: 1,
    padding: 3,
    marginRight: 5,
    textAlign: "center",
    borderColor: "grey"
  },
  sparkline: {
    height: "100%",
    flex: 1,
    width: "100%"
  },
  pricePercent: {
    alignItems: "flex-end",
    flex: 0.6
  }
});

export default MarketOverviewItem;
