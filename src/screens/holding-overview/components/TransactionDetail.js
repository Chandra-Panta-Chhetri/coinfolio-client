import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { COLORS, GLOBAL_CONSTANTS } from "../../../constants";
import { Button, Modal } from "../../../shared-components";
import { TYPOGRAPHY } from "../../../styles";
import { formatNumWorklet, toISOSubstring } from "../../../utils";
import { TYPE_NAME_MAP } from "./Transaction";

function TransactionDetail({ transaction, hideDetails, summary, onDelete }) {
  const isShown = transaction !== null && transaction !== undefined;

  const onEditPress = () => {};

  return (
    <Modal visible={isShown} onDismiss={hideDetails}>
      <Text style={TYPOGRAPHY.title}>Details</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: GLOBAL_CONSTANTS.MD_MARGIN }}>
        <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
          <Text style={{ ...TYPOGRAPHY.body2 }}>Type</Text>
          <Text style={{ ...TYPOGRAPHY.body1 }}>{TYPE_NAME_MAP[transaction?.type]}</Text>
        </View>
        <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
          <Text style={{ ...TYPOGRAPHY.body2 }}>Date</Text>
          <Text style={{ ...TYPOGRAPHY.body1 }}>
            {transaction?.date !== undefined ? toISOSubstring(new Date(transaction?.date)) : ""}
          </Text>
        </View>
        <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
          <Text style={{ ...TYPOGRAPHY.body2 }}>Price Per Coin</Text>
          <Text style={{ ...TYPOGRAPHY.body1 }}>${formatNumWorklet(transaction?.pricePerUSD)}</Text>
        </View>
        <View style={{ width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
          <Text style={{ ...TYPOGRAPHY.body2 }}>Quantity</Text>
          <Text style={{ ...TYPOGRAPHY.body1 }}>
            {formatNumWorklet(transaction?.quantity)} {summary?.coinSymbol}
          </Text>
        </View>
        <View style={{ marginBottom: GLOBAL_CONSTANTS.SM_MARGIN }}>
          <Text style={{ ...TYPOGRAPHY.body2 }}>Notes</Text>
          <Text style={{ ...TYPOGRAPHY.body1 }}>{transaction?.notes}</Text>
        </View>
      </View>
      <View
        renderToHardwareTextureAndroid
        style={{ flexDirection: "row", justifyContent: "center", marginTop: GLOBAL_CONSTANTS.MD_MARGIN }}
      >
        <Button
          label="Delete"
          onPress={onDelete}
          mode="contained"
          style={[STYLES.flex, { marginRight: GLOBAL_CONSTANTS.LG_MARGIN }]}
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
  }
});

export default TransactionDetail;
