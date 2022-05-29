import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { TouchableNativeFeedback, IconImage } from "../../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatNumBasedOnSignWorklet } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";

const TopCoin = ({ item: coin }) => {
  const navigation = useNavigation();
  const { symbol, priceUsd, changePercent24Hr, image } = coin;

  const onPress = () => {
    navigation.navigate("AssetDetail", {});
  };

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
          <Text style={TYPOGRAPHY.body1}>${priceUsd}</Text>
          <Text style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
            {formatNumBasedOnSignWorklet(changePercent24Hr)}%
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
