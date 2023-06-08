import React from "react";
import { IconImage, Swipeable, SwipeableActions, TouchableNativeFeedback } from "../../../../components";
import { View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "../../../../navigators/screen-names";
import { formatPercent, formatPrice, isNullOrUndefined } from "../../../../utils";
import { TYPOGRAPHY } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { PL_COLUMN } from "./SelectVisibleColumn";

const TableRow = ({ holding, onDelete, visibleColumn }) => {
  const navigation = useNavigation();
  const goToHoldingOverview = (coinId) => navigation?.navigate(SCREEN_NAMES.HOLDING_OVERVIEW, { coinId });

  const showDeleteModal = () => {
    if (!isNullOrUndefined(onDelete)) {
      onDelete(holding);
    }
  };

  return (
    <Swipeable
      rightActions={(props) => <SwipeableActions callbackParams={[holding]} onDelete={showDeleteModal} {...props} />}
    >
      <TouchableNativeFeedback onPress={() => goToHoldingOverview(holding?.coinId)}>
        <View>
          <DataTable.Row style={[STYLES.row]}>
            <View style={[STYLES.iconNameTicker, STYLES.marginRight]}>
              <IconImage
                source={{
                  uri: holding?.coinURL
                }}
              />
              <View style={STYLES.nameAndTicker}>
                <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
                  {holding?.coinName}
                </Text>
                <Text numberOfLines={1} style={TYPOGRAPHY.caption}>
                  {holding?.coinSymbol}
                </Text>
              </View>
            </View>
            <View style={[STYLES.flex, STYLES.marginRight]}>
              <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                {formatPrice(holding?.priceUSD?.value)}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  TYPOGRAPHY.textAlignRight,
                  getStylesBasedOnSign(holding?.priceUSD?.percentChange),
                  TYPOGRAPHY.caption
                ]}
              >
                {formatPercent(holding?.priceUSD?.percentChange)}
              </Text>
            </View>
            {visibleColumn === PL_COLUMN.label ? (
              <View style={STYLES.flex}>
                <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                  {formatPrice(holding?.profitLoss?.value)}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    TYPOGRAPHY.textAlignRight,
                    getStylesBasedOnSign(holding?.profitLoss?.percentChange),
                    TYPOGRAPHY.caption
                  ]}
                >
                  {formatPercent(holding?.profitLoss?.percentChange)}
                </Text>
              </View>
            ) : (
              <View style={STYLES.flex}>
                <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                  {formatPrice(holding?.totalValue)}
                </Text>
                <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.caption]}>
                  {formatNum(holding?.amount)}
                </Text>
              </View>
            )}
          </DataTable.Row>
        </View>
      </TouchableNativeFeedback>
    </Swipeable>
  );
};

const STYLES = StyleSheet.create({
  row: {
    paddingVertical: 8,
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopWidth: GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
  },
  flex: {
    flex: 1
  },
  marginRight: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN
  },
  iconNameTicker: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1.3
  },
  nameAndTicker: { marginLeft: GLOBAL_CONSTANTS.SM_MARGIN, flex: 1 }
});

export default TableRow;
