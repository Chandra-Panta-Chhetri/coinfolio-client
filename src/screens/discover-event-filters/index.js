import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { EVENTS_CONSTANTS, GLOBAL_CONSTANTS } from "../../constants";
import { selectEventFilters, startEventsFetch, updateEventFilters } from "../../redux/discover";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { DatePicker, DropDown, Button } from "../../shared-components";

const DiscoverEventFiltersScreen = ({ fetchEvents, updateEventFilters, navigation, appliedFilters }) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState(appliedFilters);

  const onDateRangeConfirm = (dateRange) =>
    setFilters({
      ...filters,
      dateRange: dateRange
    });

  const onShowOnlyDropDownSelect = (_, selectedIndex) => setFilters({ ...filters, showOnly: selectedIndex });

  const applyFilters = () => {
    updateEventFilters(filters);
    fetchEvents();
    navigation.navigate("Discover", { screen: "Events" });
  };

  const resetFilters = () => {
    setFilters(EVENTS_CONSTANTS.DEFAULT_DISCOVER_FILTERS);
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

const mapStateToProps = (state) => ({
  appliedFilters: selectEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startEventsFetch()),
  updateEventFilters: (filters) => dispatch(updateEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverEventFiltersScreen);
