import React from "react";
import { View, StyleSheet } from "react-native";
import { SparkLine } from "../../../shared-components";
import { formatNumBasedOnSignWorklet, getStylesBasedOnSign } from "../../../utils";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { Avatar, Text } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const xValueAccessor = (dataInstance) => dataInstance[1];
const yValueAccessor = (dataInstance) => dataInstance[0];
const dataPointsAccessor = (data) => data.prices;

const MarketOverviewItem = ({ item, containerStyle = {} }) => {
  return (
    <View style={[STYLES.container, containerStyle]}>
      <Avatar.Image
        size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
        source={{
          uri: item.iconUrl
        }}
      />
      <View style={STYLES.rankSymbolMarketCap}>
        <View style={STYLES.rankSymbol}>
          <Text style={[STYLES.rank, TYPOGRAPHY.body1]}>{item.rank}</Text>
          <Text numberOfLines={1} style={TYPOGRAPHY.body2}>
            {item.symbol}
          </Text>
        </View>
        <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
          MCap - {item.marketCap}
        </Text>
      </View>
      <SparkLine
        data={item.sparkLine}
        isPositive={item.percentChange >= 0}
        chartStyle={STYLES.sparkline}
        xValueAccessor={xValueAccessor}
        yValueAccessor={yValueAccessor}
        dataPointsAccessor={dataPointsAccessor}
      />
      <View style={STYLES.pricePercent}>
        <Text style={TYPOGRAPHY.body2}>${item.price}</Text>
        <Text style={[getStylesBasedOnSign(item.percentChange), TYPOGRAPHY.body1]}>
          {formatNumBasedOnSignWorklet(item.percentChange)}%
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
