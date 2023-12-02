import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Skeleton, TouchableNativeFeedback } from "../../../components";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { formatNum, formatPrice, isNullOrUndefined, formatDate } from "../../../utils";
import { TYPOGRAPHY } from "../../../styles";
import {
  BUY_TRANSACTION_TYPE,
  SELL_TRANSACTION_TYPE,
  TRANSFER_IN_TRANSACTION_TYPE,
  TRANSFER_OUT_TRANSACTION_TYPE
} from "../../AddEditTransaction/transaction-types";

export const TRANSACTION_TYPE_TO_NAME = {
  buy: BUY_TRANSACTION_TYPE.label,
  sell: SELL_TRANSACTION_TYPE.label,
  transfer_in: TRANSFER_IN_TRANSACTION_TYPE.label,
  transfer_out: TRANSFER_OUT_TRANSACTION_TYPE.label
};

function Transaction({ transaction, onSelect, holdingOverview }) {
  const isBuyOrSell =
    transaction?.type === SELL_TRANSACTION_TYPE.value || transaction?.type === BUY_TRANSACTION_TYPE.value;

  const onPress = () => {
    if (!isNullOrUndefined(onSelect)) {
      onSelect(transaction);
    }
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={STYLES.transaction}>
        <View style={STYLES.infoSection}>
          <Text style={TYPOGRAPHY.body2}>{TRANSACTION_TYPE_TO_NAME[transaction?.type] ?? ""}</Text>
          <Text style={TYPOGRAPHY.body1}>
            {formatNum(transaction?.quantity)} {holdingOverview?.coinSymbol}
          </Text>
        </View>
        <View style={STYLES.infoSection}>
          <Text style={TYPOGRAPHY.body1}>{formatDate(transaction?.date)}</Text>
          {isBuyOrSell ? (
            <Text style={TYPOGRAPHY.body1}>{formatPrice(transaction?.quantity * transaction?.pricePer)}</Text>
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
  },
  infoSection: { flexDirection: "row", justifyContent: "space-between" }
});

export default Transaction;
