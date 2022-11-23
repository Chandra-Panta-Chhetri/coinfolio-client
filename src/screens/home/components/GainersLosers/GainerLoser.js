import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatPercentWorklet } from "../../../../utils";
import { TouchableNativeFeedback, IconImage } from "../../../../shared-components";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const GainerLoser = ({ coin, containerStyle = null }) => {
  const navigation = useNavigation();
  const { image, name, symbol, priceUsd, changePercent24Hr, id } = coin;

  const onPress = () => navigation.navigate("AssetDetail", { image, name, symbol, id });

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={onPress}>
      <Card style={STYLES.cardContainer}>
        <Card.Content style={STYLES.gainerLoserCardBody}>
          <IconImage
            source={{
              uri: image
            }}
          />
          <View style={STYLES.infoContainer}>
            <View style={STYLES.nameSymbol}>
              <Text numberOfLines={1} style={TYPOGRAPHY.subheading}>
                {name}
              </Text>
              <Text style={TYPOGRAPHY.body1}>{symbol}</Text>
            </View>
            <View style={[STYLES.priceAndPercent]}>
              <Text numberOfLines={1} style={TYPOGRAPHY.subheading}>
                {priceUsd}
              </Text>
              <Text numberOfLines={1} style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
                {formatPercentWorklet(changePercent24Hr)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  gainerLoserCardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN
  },
  priceAndPercent: {
    alignItems: "flex-end"
  },
  nameSymbol: {
    flex: 0.8
  }
});

export default memo(GainerLoser);
