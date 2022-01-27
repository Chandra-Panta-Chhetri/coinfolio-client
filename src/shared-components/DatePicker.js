import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { useTheme, Portal, Modal, Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import TouchableNativeFeedback from "./TouchableNativeFeedback";

const DatePicker = ({ isRangePicker = true, onConfirm, initialStartDate = null, initialEndDate = null }) => {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  useEffect(() => {
    if (startDate !== initialStartDate) {
      setStartDate(initialStartDate);
    }
    if (endDate !== initialEndDate) {
      setEndDate(initialEndDate);
    }
  }, [initialEndDate, initialStartDate]);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  const closePicker = () => {
    setEndDate(initialEndDate);
    setStartDate(initialStartDate);
    hideModal();
  };

  const confirmSelectedDates = () => {
    const selectedDates = {
      start: startDate,
      end: endDate
    };
    onConfirm && onConfirm(selectedDates);
    hideModal();
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={showModal}
        viewContainerStyle={[GLOBAL_STYLES.borderWidth, { borderColor: colors.text }]}
      >
        <View style={STYLES.dateOutputContainer}>
          <Text style={TYPOGRAPHY.body1}>{startDate ? new Date(startDate).toDateString() : "..."}</Text>
          {isRangePicker && endDate && <Text style={TYPOGRAPHY.body1}> - {new Date(endDate).toDateString()}</Text>}
        </View>
      </TouchableNativeFeedback>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={[STYLES.modalContainer, { backgroundColor: colors.card }]}
          style={STYLES.modalWrapper}
          dismissable={false}
        >
          <CalendarPicker
            startFromMonday
            allowRangeSelection={isRangePicker}
            todayBackgroundColor={colors.text}
            todayTextStyle={{
              color: colors.card
            }}
            selectedDayColor={colors.primary}
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
            selectedEndDate={endDate}
            selectedStartDate={startDate}
            textStyle={{
              color: colors.text
            }}
            dayLabelsWrapper={{
              borderColor: colors.text
            }}
            nextComponent={<MaterialIcons name="navigate-next" size={28} color={colors.text} />}
            previousComponent={<MaterialIcons name="navigate-before" size={28} color={colors.text} />}
          />
          <View style={STYLES.modalActionButtons}>
            <Button labelStyle={TYPOGRAPHY.button} onPress={closePicker} color={colors.notification}>
              Cancel
            </Button>
            <Button labelStyle={TYPOGRAPHY.button} onPress={confirmSelectedDates} disabled={!endDate}>
              Ok
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const STYLES = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    ...GLOBAL_STYLES.borderRadius
  },
  modalWrapper: {
    marginHorizontal: 10
  },
  modalActionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  dateOutputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  }
});

export default DatePicker;
