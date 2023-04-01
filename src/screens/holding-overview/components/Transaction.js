import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Skeleton, TouchableNativeFeedback } from "../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { formatNumWorklet, toISOSubstring } from "../../../utils";
import { TYPOGRAPHY } from "../../../styles";

export const TYPE_NAME_MAP = {
  buy: "Buy",
  sell: "Sell",
  transfer_in: "Transfer In",
  transfer_out: "Transfer Out"
};

function Transaction({ transaction, onSelect, summary }) {
  const onPress = () => {
    if (onSelect !== undefined && onSelect !== null) {
      onSelect(transaction);
    }
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={STYLES.transaction}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...TYPOGRAPHY.body2 }}>{TYPE_NAME_MAP[transaction?.type]}</Text>
          <Text style={{ ...TYPOGRAPHY.body1 }}>
            {formatNumWorklet(transaction?.quantity)} {summary?.coinSymbol}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...TYPOGRAPHY.body1 }}>
            {transaction?.date !== undefined ? toISOSubstring(new Date(transaction?.date)) : ""}
          </Text>
          {transaction?.type === "sell" || transaction?.type === "buy" ? (
            <Text style={{ ...TYPOGRAPHY.body1 }}>
              ${formatNumWorklet(transaction?.quantity * transaction?.pricePerUSD)}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

Transaction.Skeleton = ({ style }) => {
  return <Skeleton style={[style, STYLES.transactionSkeleton]} />;
};

const STYLES = StyleSheet.create({
  transactionSkeleton: {
    height: 60,
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN,
    width: "100%"
  },
  transaction: {
    borderBottomColor: "black",
    borderBottomWidth: GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH,
    paddingVertical: 10
  }
});

export default Transaction;
