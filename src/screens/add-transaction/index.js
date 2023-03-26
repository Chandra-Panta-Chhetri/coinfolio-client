import React, { useCallback, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../constants";
import { startAddingNewTransaction } from "../../redux/portfolio/portfolio.actions";
import { selectIsAddingTransaction } from "../../redux/portfolio/portfolio.selectors";
import { TextInput, DatePicker, DropDown, Button } from "../../shared-components";
import { GLOBAL_STYLES } from "../../styles";
import { TextInput as RNPTextInput } from "react-native-paper";
import { useHandleNativeBack } from "../../hooks";

const TRANSACTION_TYPES = [
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
  { label: "Transfer In", value: "transfer_in" },
  { label: "Transfer Out", value: "transfer_out" }
];

function AddTransactionScreen({ route, navigation, isAddingTransaction, addTransaction }) {
  const { selectedCoin, startingScreen } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm({
    defaultValues: {
      type: 0,
      quantity: "",
      pricePer: "",
      date: null,
      notes: ""
    }
  });
  const quantityInputRef = useRef();
  const notesInputRef = useRef();
  const backAction = useCallback(() => isAddingTransaction, [isAddingTransaction]);
  useHandleNativeBack(backAction);

  const goBack = () => {
    if (startingScreen === "SelectTransactionCoin") {
      navigation?.navigate("Portfolio");
    } else {
      navigation?.goBack();
    }
  };

  const onSubmit = (data) => {
    if (selectedCoin !== undefined || selectedCoin !== null) {
      delete data["date"];
      if (data["notes"] === "") {
        delete data["notes"];
      }
      const transactionToAdd = {
        ...data,
        coinId: selectedCoin?.id,
        type: TRANSACTION_TYPES[data?.type]?.value
      };
      addTransaction(transactionToAdd, goBack);
    }
  };

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: "padding",
          android: "height"
        })}
        style={STYLES.flex}
      >
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }) => (
            <DropDown
              options={TRANSACTION_TYPES}
              selectedIndex={value}
              onSelect={(value, index) => onChange(index)}
              containerStyle={[STYLES.field, { height: 56 }]}
            />
          )}
          name="type"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              returnKeyType="next"
              onBlur={onBlur}
              onChangeText={onChange}
              inputMode="numeric"
              value={value}
              placeholder="Price Per Coin"
              style={STYLES.field}
              onSubmitEditing={() => quantityInputRef?.current?.focus()}
              right={<RNPTextInput.Icon icon={() => <Text>USD</Text>} />}
            />
          )}
          name="pricePer"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              returnKeyType="next"
              onBlur={onBlur}
              ref={quantityInputRef}
              onChangeText={onChange}
              inputMode="numeric"
              value={value}
              placeholder="Quantity"
              style={STYLES.field}
              onSubmitEditing={() => notesInputRef?.current?.focus()}
              right={<RNPTextInput.Icon icon={() => <Text>{selectedCoin?.symbol}</Text>} />}
            />
          )}
          name="quantity"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              isRangePicker={false}
              onConfirm={(selectedDates) => onChange(selectedDates?.start)}
              initialStartDate={value}
              style={[STYLES.field, { height: 56 }]}
            />
          )}
          name="date"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 255
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              ref={notesInputRef}
              placeholder="Notes (Optional)"
              multiline
              rows={5}
              style={STYLES.field}
            />
          )}
          name="notes"
        />
      </KeyboardAvoidingView>
      <View style={STYLES.formActions}>
        <Button label={"Cancel"} disabled={isAddingTransaction} onPress={goBack} mode="contained" style={STYLES.flex} />
        <Button
          label={isAddingTransaction ? "Creating..." : "Create"}
          disabled={isAddingTransaction || !isValid || !isDirty}
          loading={isAddingTransaction}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={STYLES.submitFormBtn}
        />
      </View>
    </ScrollView>
  );
}

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
    flex: 1
  },
  field: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  flex: {
    flex: 1
  },
  formActions: { display: "flex", flexDirection: "row", justifyContent: "center" },
  submitFormBtn: { flex: 1, marginLeft: GLOBAL_CONSTANTS.LG_MARGIN }
});

const mapStateToProps = (state) => ({
  isAddingTransaction: selectIsAddingTransaction(state)
});

const mapDispatchToProps = (dispatch) => ({
  addTransaction: (transaction, onSuccess) => dispatch(startAddingNewTransaction(transaction, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen);
