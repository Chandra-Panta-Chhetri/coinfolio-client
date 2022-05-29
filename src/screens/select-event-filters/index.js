import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DropDown, DatePicker } from "../../shared-components";
import { connect } from "react-redux";
import { selectEventFilters, startEventsFetch, updateEventFilters } from "../../redux/discover";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Button, Text, useTheme } from "react-native-paper";
import { EVENTS_CONSTANTS } from "../../constants";

const SelectEventFiltersScreen = ({ fetchEvents, updateEventFilters, navigation, appliedFilters }) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState(appliedFilters);

  const onDateRangeConfirm = (dateRange) =>
    setFilters({
      ...filters,
      dateRange: dateRange
    });

  const applyFilter = () => {
    updateEventFilters(filters);
    fetchEvents();
    navigation.navigate("Discover", { screen: "Events" });
  };

  const onShowOnlyDropDownSelect = (_, selectedIndex) => setFilters({ ...filters, showOnly: selectedIndex });

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
        <View style={GLOBAL_STYLES.lgMarginBottom}>
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
        <Button
          labelStyle={TYPOGRAPHY.button}
          mode="contained"
          onPress={applyFilter}
          style={[STYLES.applyButton, STYLES.flex]}
        >
          Apply
        </Button>
        <Button
          labelStyle={TYPOGRAPHY.button}
          mode="contained"
          onPress={resetFilters}
          color={colors.card}
          style={STYLES.flex}
        >
          Reset
        </Button>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  flex: {
    flex: 1
  },
  filterLabel: {
    ...GLOBAL_STYLES.smMarginBottom,
    ...TYPOGRAPHY.subheading
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  applyButton: {
    marginRight: 10
  }
});

const mapStateToProps = (state) => ({
  appliedFilters: selectEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startEventsFetch()),
  updateEventFilters: (filters) => dispatch(updateEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectEventFiltersScreen);
