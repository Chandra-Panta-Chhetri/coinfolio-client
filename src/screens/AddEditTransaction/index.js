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
import { TextInput, DatePicker, DropDown, Button, TouchableNativeFeedback } from "../../components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { usePreventNativeBackWhenLoading } from "../../hooks";
import TRANSACTION_TYPES, { TRANSFER_IN_TRANSACTION_TYPE, TRANSFER_OUT_TRANSACTION_TYPE } from "./transaction-types";
import { isNullOrUndefined } from "../../utils";
import SCREEN_NAMES from "../../navigators/screen-names";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const AddEditTransactionScreen = ({
  route,
  navigation,
  isAddingTransaction,
  addTransaction,
  updateTransaction,
  isUpdatingTransaction
}) => {
  const { selectedCoin, startingScreen, transactionToUpdate, selectedCurrencyCode } = route?.params ?? {};
  const currencyCode = isNullOrUndefined(selectedCurrencyCode)
    ? isInEditMode
      ? transactionToUpdate?.currencyCode
      : "USD"
    : selectedCurrencyCode;
  const isInEditMode = !isNullOrUndefined(transactionToUpdate);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    defaultValues: {
      type: isInEditMode ? TRANSACTION_TYPES.findIndex((type) => type.value === transactionToUpdate?.type) : 0,
      quantity: isInEditMode ? transactionToUpdate?.quantity : "1",
      pricePer: isInEditMode ? transactionToUpdate?.pricePer ?? "1" : "1",
      date: isInEditMode ? transactionToUpdate?.date : new Date(),
      notes: isInEditMode ? transactionToUpdate?.notes ?? "" : ""
    }
  });
  const { colors } = useTheme();
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
      const transaction = {
        ...data,
        type: TRANSACTION_TYPES[data?.type]?.value,
        currencyCode,
        coinId: selectedCoin?.id
      };
      if (isInEditMode) {
        updateTransaction(transactionToUpdate?.id, transaction, goBack);
      } else {
        addTransaction(transaction, goBack, startingScreen);
      }
    }
  };

  const transactionType = watch("type");
  const isTransferTransactionType =
    TRANSACTION_TYPES[transactionType]?.value === TRANSFER_IN_TRANSACTION_TYPE.value ||
    TRANSACTION_TYPES[transactionType]?.value === TRANSFER_OUT_TRANSACTION_TYPE.value;

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: "padding",
          android: "height"
        })}
        style={STYLES.formContainer}
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
              dimensions={STYLES.fieldHeight}
            />
          )}
          name="type"
        />
        {isTransferTransactionType ? null : (
          <View style={STYLES.pricePerCurrencyCode}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  returnKeyType="next"
                  onBlur={() => {
                    onChange(`${Number(value)}`);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                  inputMode="numeric"
                  placeholder="Price Per Coin"
                  onSubmitEditing={() => quantityInputRef?.current?.focus()}
                  disabled={isTransferTransactionType}
                  style={STYLES.flex}
                />
              )}
              name="pricePer"
            />
            <TouchableNativeFeedback
              onPress={() => {
                navigation?.navigate(SCREEN_NAMES.SELECT_CURRENCY, {
                  fromScreen: SCREEN_NAMES.ADD_EDIT_TRANSACTION
                });
              }}
              viewContainerStyle={STYLES.currencyCodeFeedback}
            >
              <View style={[STYLES.currencyCodeContainer, { borderColor: colors?.text }]}>
                <Text style={TYPOGRAPHY.body1}>{currencyCode}</Text>
                <AntDesign name={"caretdown"} color={colors?.text} style={STYLES.currencyCodeCaretDown} />
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              returnKeyType="next"
              onBlur={() => {
                onChange(`${Number(value)}`);
                onBlur();
              }}
              ref={quantityInputRef}
              onChangeText={onChange}
              inputMode="numeric"
              value={value}
              placeholder="Quantity"
              onSubmitEditing={() => notesInputRef?.current?.focus()}
              right={<TextInput.Affix text={selectedCoin?.symbol} />}
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
              inputStyle={STYLES.fieldHeight}
              placeholder="Date"
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
          disabled={(isInEditMode ? isUpdatingTransaction : isAddingTransaction) || !isValid}
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
  flex: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    rowGap: 20
  },
  pricePerCurrencyCode: { flexDirection: "row" },
  formActions: { display: "flex", flexDirection: "row", justifyContent: "center" },
  submitFormBtn: { flex: 1, marginLeft: GLOBAL_CONSTANTS.LG_MARGIN },
  fieldHeight: {
    height: 56
  },
  currencyCodeFeedback: {
    marginLeft: GLOBAL_CONSTANTS.SM_MARGIN,
    marginTop: 8
  },
  currencyCodeContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: GLOBAL_CONSTANTS.BORDER_WIDTH,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  currencyCodeCaretDown: {
    ...TYPOGRAPHY.body1,
    marginLeft: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

const mapStateToProps = (state) => ({
  isAddingTransaction: selectIsAddingTransaction(state),
  isUpdatingTransaction: selectIsUpdatingTransaction(state)
});

const mapDispatchToProps = (dispatch) => ({
  addTransaction: (transaction, onSuccess, startingScreen) =>
    dispatch(addNewTransaction(transaction, onSuccess, startingScreen)),
  updateTransaction: (transactionId, transaction, onSuccess) =>
    dispatch(updateTransaction(transactionId, transaction, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTransactionScreen);
