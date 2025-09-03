import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import DatePicker from "./DatePicker";
import DropDown from "./DropDown";
import Button from "./Button";
import EVENTS_FILTERS from "./Events/filters";
import SCREEN_NAMES from "../navigators/screen-names";
import { useNavigation } from "@react-navigation/native";

const EventFilters = ({ fetchEvents, updateEventFilters, activeFilters, route, screenName }) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState(activeFilters);
  const isForAssetDetail = screenName === SCREEN_NAMES.ASSET_DETAIL_EVENT_FILTERS;
  const navigation = useNavigation();

  const onDateRangeConfirm = (dateRange) =>
    setFilters({
      ...filters,
      dateRange: dateRange
    });

  const onDropDownSelect = (_, selectedIndex) => {
    if (isForAssetDetail) {
      setFilters({ ...filters, sortBy: selectedIndex });
    } else {
      setFilters({ ...filters, showOnly: selectedIndex });
    }
  };

  const applyFilters = () => {
    updateEventFilters(filters);
    if (isForAssetDetail) {
      fetchEvents(route?.params);
    } else {
      fetchEvents();
    }
    navigation?.goBack();
  };

  const resetFilters = () => {
    if (isForAssetDetail) {
      setFilters(EVENTS_FILTERS.DEFAULT_ASSET_FILTERS);
    } else {
      setFilters(EVENTS_FILTERS.DEFAULT_DISCOVER_FILTERS);
    }
  };

  return (
    <View style={[GLOBAL_STYLES.screenContainer, STYLES.flex]}>
      <View style={STYLES.flex}>
        <View style={STYLES.dateRangeField}>
          <Text style={STYLES.filterLabel}>Date range</Text>
          <DatePicker
            onConfirm={onDateRangeConfirm}
            initialEndDate={filters?.dateRange?.end}
            initialStartDate={filters?.dateRange?.start}
          />
        </View>
        <View>
          <Text style={STYLES.filterLabel}>{isForAssetDetail ? "Sort by" : "Show only"}</Text>
          <DropDown
            onSelect={onDropDownSelect}
            options={EVENTS_FILTERS.TYPES}
            selectedIndex={isForAssetDetail ? filters?.sortBy : filters?.showOnly}
          />
        </View>
      </View>
      <View style={STYLES.buttonContainer}>
        <Button mode="contained" onPress={applyFilters} style={[STYLES.applyButton, STYLES.flex]} label="Apply" />
        <Button mode="contained" onPress={resetFilters} buttonColor={colors?.card} style={STYLES.flex} label="Reset" />
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
