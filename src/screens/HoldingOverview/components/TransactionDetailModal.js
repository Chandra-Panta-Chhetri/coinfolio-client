import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { COLORS, GLOBAL_CONSTANTS } from "../../../constants";
import { Button, Modal } from "../../../components";
import { TYPOGRAPHY } from "../../../styles";
import { formatNum, formatPrice, isNullOrUndefined, formatDate } from "../../../utils";
import { TRANSACTION_TYPE_TO_NAME } from "./Transaction";

function TransactionDetailModal({ transaction, hideDetails, holdingOverview, onDelete, onEdit }) {
  const isShown = !isNullOrUndefined(transaction);

  const onEditPress = () => {
    if (!isNullOrUndefined(onEdit)) {
      onEdit(transaction);
    }
  };

  return (
    <Modal visible={isShown} onDismiss={hideDetails}>
      <Text style={TYPOGRAPHY.title}>Details</Text>
      <View style={STYLES.detailsContainer}>
        <View style={STYLES.detail}>
          <Text style={TYPOGRAPHY.body2}>Type</Text>
          <Text style={TYPOGRAPHY.body1}>{TRANSACTION_TYPE_TO_NAME[transaction?.type] ?? ""}</Text>
        </View>
        <View style={STYLES.detail}>
          <Text style={TYPOGRAPHY.body2}>Date</Text>
          <Text style={TYPOGRAPHY.body1}>{formatDate(transaction?.date)}</Text>
        </View>
        <View style={STYLES.detail}>
          <Text style={TYPOGRAPHY.body2}>Price Per Coin</Text>
          <Text style={TYPOGRAPHY.body1}>
            {formatPrice(transaction?.pricePer, false, { code: transaction?.currencyCode }, true, 2)}
          </Text>
        </View>
        <View style={STYLES.detail}>
          <Text style={TYPOGRAPHY.body2}>Quantity</Text>
          <Text style={TYPOGRAPHY.body1}>
            {formatNum(transaction?.quantity)} {holdingOverview?.coinSymbol}
          </Text>
        </View>
        <View style={STYLES.notes}>
          <Text style={TYPOGRAPHY.body2}>Notes</Text>
          <Text style={TYPOGRAPHY.body1}>{transaction?.notes}</Text>
        </View>
      </View>
      <View renderToHardwareTextureAndroid style={STYLES.actions}>
        <Button
          label="Delete"
          onPress={onDelete}
          mode="contained"
          style={STYLES.deleteTransactionButton}
          buttonColor={COLORS.ERROR}
        />
        <Button label={"Edit"} onPress={onEditPress} mode="contained" style={STYLES.flex} />
      </View>
    </Modal>
  );
}

const STYLES = StyleSheet.create({
  flex: {
    flex: 1
  },
  actions: { flexDirection: "row", justifyContent: "center", marginTop: GLOBAL_CONSTANTS.MD_MARGIN },
  deleteTransactionButton: { marginRight: GLOBAL_CONSTANTS.LG_MARGIN, flex: 1 },
  detailsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: GLOBAL_CONSTANTS.MD_MARGIN },
  detail: { width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN },
  notes: { marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }
});

export default TransactionDetailModal;
