import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import CONSTANTS from "../../Constants";
import { useTheme, Portal, Modal, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";

const DatePicker = ({
  isRangePicker = true,
  onConfirm = CONSTANTS.SHARED.EMPTY_FUNCTION,
  initialStartDate = null,
  initialEndDate = null
}) => {
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
    onConfirm(selectedDates);
    hideModal();
  };

  return (
    <>
      <Button onPress={showModal}>Show Picker</Button>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
          style={styles.modalWrapper}
        >
          <CalendarPicker
            startFromMonday
            allowRangeSelection={isRangePicker}
            todayBackgroundColor={colors.text}
            selectedDayColor={colors.primary}
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
            selectedEndDate={endDate}
            selectedStartDate={startDate}
            nextComponent={
              <MaterialIcons
                name="navigate-next"
                size={28}
                color={colors.text}
              />
            }
            previousComponent={
              <MaterialIcons
                name="navigate-before"
                size={28}
                color={colors.text}
              />
            }
          />
          <View style={styles.modalActionButtons}>
            <Button labelStyle={GlobalStyles.button} onPress={closePicker}>
              Cancel
            </Button>
            <Button
              labelStyle={GlobalStyles.button}
              onPress={confirmSelectedDates}
              disabled={!endDate}
            >
              Ok
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    ...GlobalStyles.borderRadius
  },
  modalWrapper: {
    marginHorizontal: 10
  },
  modalActionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

export default DatePicker;
