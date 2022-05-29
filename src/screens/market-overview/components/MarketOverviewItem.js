import React from "react";
import { View, StyleSheet } from "react-native";
import { IconImage, TouchableNativeFeedback } from "../../../shared-components";
import { formatNumBasedOnSignWorklet, getStylesBasedOnSign } from "../../../utils";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const MarketOverviewItem = ({ item }) => {
  const { changePercent24Hr, name, priceUsd, image, rank, marketCap } = item;
  const { colors } = useTheme();
  const navigation = useNavigation();

  const onClick = () => navigation.navigate("AssetDetail", {});

  return (
    <TouchableNativeFeedback onPress={onClick}>
      <View style={[STYLES.container]}>
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
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
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
