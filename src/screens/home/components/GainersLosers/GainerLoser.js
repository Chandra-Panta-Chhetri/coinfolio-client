import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatPercent, formatPrice } from "../../../../utils";
import { TouchableNativeFeedback, IconImage } from "../../../../components";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import SCREEN_NAMES from "../../../../navigators/screen-names";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../components";
import { selectSelectedCurrency } from "../../../../redux/currency";
import { connect } from "react-redux";

const GainerLoser = ({ coin, containerStyle, selectedCurrency }) => {
  const navigation = useNavigation();
  const { image, name, symbol, priceUsd, changePercent24Hr, id } = coin;

  const goToAssetDetail = () => navigation?.navigate(SCREEN_NAMES.ASSET_DETAIL, { image, name, symbol, id });

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={goToAssetDetail}>
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
                {formatPrice(priceUsd, false, selectedCurrency)}
              </Text>
              <Text numberOfLines={1} style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
                {formatPercent(changePercent24Hr)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

export const GainerLoserSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, STYLES.cardContainer]}>
    <Card.Content style={STYLES.cardBody}>
      <Skeleton style={STYLES.icon} />
      <View style={STYLES.infoContainer}>
        <View style={STYLES.rowFlexbox}>
          <Skeleton style={STYLES.fullNamePrice} />
        </View>
      </View>
    </Card.Content>
  </Card>
);

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
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  fullNamePrice: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 15,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE
  }
});

const mapStateToProps = (state) => ({
  selectedCurrency: selectSelectedCurrency(state)
});

export default memo(connect(mapStateToProps)(GainerLoser));
