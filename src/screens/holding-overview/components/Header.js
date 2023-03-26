import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { IconImage, Skeleton } from "../../../shared-components";
import { TYPOGRAPHY } from "../../../styles";
import {
  formatNumWorklet,
  formatPercentWorklet,
  formatPriceWorklet,
  getStylesBasedOnSignWorklet
} from "../../../utils";

function Header({ summary, isLoading }) {
  return (
    <Card style={{ marginBottom: GLOBAL_CONSTANTS.MD_MARGIN }}>
      <Card.Content>
        {isLoading ? (
          <View>
            <Skeleton count={2} style={{ width: "100%", height: 20, marginBottom: GLOBAL_CONSTANTS.MD_MARGIN }} />
            <Skeleton style={{ width: "100%", height: 20 }} />
          </View>
        ) : (
          <View>
            {/* <View style={{ flexDirection: "row", marginBottom: GLOBAL_CONSTANTS.MD_MARGIN, alignItems: "center" }}>
            <IconImage source={{ uri: summary?.coinURL }} />
            <Text style={{ marginLeft: GLOBAL_CONSTANTS.MD_MARGIN, ...TYPOGRAPHY.title }}>
              {summary?.coinName} ({summary?.coinSymbol})
            </Text>
          </View> */}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
                <Text style={{ ...TYPOGRAPHY.body2 }}>Total Cost</Text>
                <Text style={{ ...TYPOGRAPHY.body1 }}>${formatNumWorklet(summary?.totalCost)}</Text>
              </View>
              <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
                <Text style={{ ...TYPOGRAPHY.body2 }}>Average Cost</Text>
                <Text style={{ ...TYPOGRAPHY.body1 }}>${formatNumWorklet(summary?.avgCost)}</Text>
              </View>
              <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
                <Text style={{ ...TYPOGRAPHY.body2 }}>Holdings Value</Text>
                <Text style={{ ...TYPOGRAPHY.body1 }}>${formatNumWorklet(summary?.totalValue)}</Text>
              </View>
              <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
                <Text style={{ ...TYPOGRAPHY.body2 }}>Total Holdings</Text>
                <Text style={{ ...TYPOGRAPHY.body1 }}>
                  {formatNumWorklet(summary?.amount)} {summary?.coinSymbol}
                </Text>
              </View>
              <View>
                <Text style={{ ...TYPOGRAPHY.body2 }}>Profit/Loss</Text>
                <Text style={[getStylesBasedOnSignWorklet(summary?.profitLoss?.percentChange), TYPOGRAPHY.body1]}>
                  {formatPriceWorklet(summary?.profitLoss?.value)} (
                  {formatPercentWorklet(summary?.profitLoss?.percentChange)})
                </Text>
              </View>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

export default Header;
