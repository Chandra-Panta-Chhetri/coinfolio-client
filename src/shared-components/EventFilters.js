import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import DatePicker from "./DatePicker";
import DropDown from "./DropDown";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import { Text, useTheme } from "react-native-paper";
import { EVENTS_CONSTANTS, GLOBAL_CONSTANTS } from "../constants";

const EventFilters = ({ defaultFilters, onApplyFilters }) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState(defaultFilters);

  const onDateRangeConfirm = (dateRange) =>
    setFilters({
      ...filters,
      dateRange: dateRange
    });

  const onShowOnlyDropDownSelect = (_, selectedIndex) => setFilters({ ...filters, showOnly: selectedIndex });

  const applyFilters = () => onApplyFilters && onApplyFilters(filters);

  const resetFilters = () => {
    setFilters({
      dateRange: {
        start: null,
        end: null
      },
      showOnly: EVENTS_CONSTANTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
      limit: EVENTS_CONSTANTS.NUM_TO_SHOW
    });
  };

  return (
    <View style={[GLOBAL_STYLES.screenContainer, STYLES.flex]}>
      <View style={STYLES.flex}>
        <View style={STYLES.dateRangeField}>
          <Text style={STYLES.filterLabel}>Date range</Text>
          <DatePicker
            onConfirm={onDateRangeConfirm}
            initialEndDate={filters.dateRange.end}
            initialStartDate={filters.dateRange.start}
          />
        </View>
        <View>
          <Text style={STYLES.filterLabel}>Show only</Text>
          <DropDown
            onSelect={onShowOnlyDropDownSelect}
            options={EVENTS_CONSTANTS.SHOW_ONLY_FILTERS}
            selectedIndex={filters.showOnly}
          />
        </View>
      </View>
      <View style={STYLES.buttonContainer}>
        <Button mode="contained" onPress={applyFilters} style={[STYLES.applyButton, STYLES.flex]} label="Apply" />
        <Button mode="contained" onPress={resetFilters} color={colors.card} style={STYLES.flex} label="Reset" />
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  dateRangeField: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  flex: {
    flex: 1
  },
  filterLabel: {
    ...TYPOGRAPHY.subheading,
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  applyButton: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default EventFilters;
