import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { useTheme, Portal, Modal, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import TouchableNativeFeedback from "./TouchableNativeFeedback";
import Button from "./Button";
import { GLOBAL_CONSTANTS } from "../constants";
import { AntDesign } from "@expo/vector-icons";

const DatePicker = ({ isRangePicker = true, onConfirm, initialStartDate, initialEndDate, style }) => {
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
        viewContainerStyle={[STYLES.nativeFeedbackContainer, { borderColor: colors.text }, style]}
      >
        <View style={STYLES.dateOutputContainer}>
          <View style={STYLES.selectedDates}>
            <Text style={TYPOGRAPHY.body1}>{startDate ? new Date(startDate).toDateString() : "Date"}</Text>
            {isRangePicker && endDate && <Text style={TYPOGRAPHY.body1}> - {new Date(endDate).toDateString()}</Text>}
          </View>
          <AntDesign name="calendar" size={GLOBAL_CONSTANTS.ICON_SIZE} color={colors?.text} />
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
            <Button label="Cancel" onPress={closePicker} buttonColor={colors.notification} textColor={colors?.text} />
            <Button
              label="Ok"
              onPress={confirmSelectedDates}
              disabled={isRangePicker ? !endDate || !startDate : !startDate}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const STYLES = StyleSheet.create({
  nativeFeedbackContainer: {
    borderWidth: GLOBAL_CONSTANTS.BORDER_WIDTH
  },
  modalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
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
    justifyContent: "space-between",
    padding: 10
  },
  selectedDates: {
    flexDirection: "row"
  }
});

export default DatePicker;
