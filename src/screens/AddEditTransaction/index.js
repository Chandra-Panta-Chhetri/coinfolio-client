import React, { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../constants";
import {
  addNewTransaction,
  updateTransaction,
  selectIsAddingTransaction,
  selectIsUpdatingTransaction
} from "../../redux/portfolio";
import { TextInput, DatePicker, DropDown, Button } from "../../components";
import { GLOBAL_STYLES } from "../../styles";
import { TextInput as RNPTextInput } from "react-native-paper";
import { usePreventNativeBackWhenLoading } from "../../hooks";
import TRANSACTION_TYPES from "./transaction-types";
import { isNullOrUndefined } from "../../utils";
import SCREEN_NAMES from "../../navigators/screen-names";

const AddEditTransactionScreen = ({
  route,
  navigation,
  isAddingTransaction,
  addTransaction,
  updateTransaction,
  isUpdatingTransaction
}) => {
  const { selectedCoin, startingScreen, transactionToUpdate } = route.params;
  const isInEditMode = !isNullOrUndefined(transactionToUpdate);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm({
    defaultValues: {
      type: isInEditMode ? TRANSACTION_TYPES.findIndex((type) => type.value === transactionToUpdate?.type) : 0,
      quantity: isInEditMode ? transactionToUpdate?.quantity : "",
      pricePer: isInEditMode ? transactionToUpdate?.pricePerUSD : "",
      date: isInEditMode ? transactionToUpdate?.date : null,
      notes: isInEditMode ? transactionToUpdate?.notes : ""
    }
  });
  const quantityInputRef = useRef();
  const notesInputRef = useRef();
  const backAction = useCallback(
    () => (isInEditMode ? isUpdatingTransaction : isAddingTransaction),
    [isUpdatingTransaction, isInEditMode, isAddingTransaction]
  );
  usePreventNativeBackWhenLoading(backAction);

  useEffect(() => {
    navigation?.setOptions({
      headerTitle: isInEditMode ? "Edit Transaction" : "Add Transaction",
      gestureEnabled: !isUpdatingTransaction && !isAddingTransaction,
      headerLeft: (isInEditMode ? isUpdatingTransaction : isAddingTransaction) ? () => undefined : undefined
    });
  }, [isInEditMode, isAddingTransaction, isUpdatingTransaction]);

  const goBack = () => {
    if (startingScreen === SCREEN_NAMES.SELECT_TRANSACTION_COIN) {
      navigation?.navigate(SCREEN_NAMES.PORTFOLIO);
    } else {
      navigation?.goBack();
    }
  };

  const onSubmit = (data) => {
    if (!isNullOrUndefined(selectedCoin)) {
      delete data["date"];
      if (data["notes"] === "") {
        delete data["notes"];
      }
      if (isInEditMode) {
        const updates = {
          ...data,
          type: TRANSACTION_TYPES[data?.type]?.value
        };
        updateTransaction(transactionToUpdate?.id, updates, goBack);
      } else {
        const transactionToAdd = {
          ...data,
          coinId: selectedCoin?.id,
          type: TRANSACTION_TYPES[data?.type]?.value
        };
        addTransaction(transactionToAdd, goBack, startingScreen);
      }
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
              style={[STYLES.field, STYLES.transactionTypes]}
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
        <Button
          label={"Cancel"}
          disabled={isInEditMode ? isUpdatingTransaction : isAddingTransaction}
          onPress={goBack}
          mode="contained"
          style={STYLES.flex}
        />
        <Button
          label={
            isInEditMode
              ? isUpdatingTransaction
                ? "Updating..."
                : "Update"
              : isAddingTransaction
              ? "Creating..."
              : "Create"
          }
          disabled={(isInEditMode ? isUpdatingTransaction : isAddingTransaction) || !isValid || !isDirty}
          loading={isInEditMode ? isUpdatingTransaction : isAddingTransaction}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={STYLES.submitFormBtn}
        />
      </View>
    </ScrollView>
  );
};

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
  submitFormBtn: { flex: 1, marginLeft: GLOBAL_CONSTANTS.LG_MARGIN },
  transactionTypes: {
    height: 56
  }
});

const mapStateToProps = (state) => ({
  isAddingTransaction: selectIsAddingTransaction(state),
  isUpdatingTransaction: selectIsUpdatingTransaction(state)
});

const mapDispatchToProps = (dispatch) => ({
  addTransaction: (transaction, onSuccess, startingScreen) =>
    dispatch(addNewTransaction(transaction, onSuccess, startingScreen)),
  updateTransaction: (transactionId, updates, onSuccess) =>
    dispatch(updateTransaction(transactionId, updates, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTransactionScreen);
