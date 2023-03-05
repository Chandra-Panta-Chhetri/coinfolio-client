import React, { useState } from "react";
import { connect } from "react-redux";
import { selectAssetEventFilters, startAssetEventsFetch, updateAssetEventFilters } from "../../redux/asset-detail";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { EVENTS_CONSTANTS, GLOBAL_CONSTANTS } from "../../constants";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { DatePicker, DropDown, Button } from "../../shared-components";

const AssetDetailEventFiltersScreen = ({ fetchEvents, updateEventFilters, navigation, appliedFilters, route }) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState(appliedFilters);

  const onDateRangeConfirm = (dateRange) =>
    setFilters({
      ...filters,
      dateRange: dateRange
    });

  const onSortByDropDownSelect = (_, selectedIndex) => setFilters({ ...filters, sortBy: selectedIndex });

  const applyFilters = () => {
    updateEventFilters(filters);
    fetchEvents(route.params);
    navigation.goBack();
  };

  const resetFilters = () => {
    setFilters(EVENTS_CONSTANTS.DEFAULT_ASSET_FILTERS);
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
          <Text style={STYLES.filterLabel}>Sort by</Text>
          <DropDown
            onSelect={onSortByDropDownSelect}
            options={EVENTS_CONSTANTS.SHOW_ONLY_FILTERS}
            selectedIndex={filters.sortBy}
          />
        </View>
      </View>
      <View style={STYLES.buttonContainer}>
        <Button mode="contained" onPress={applyFilters} style={[STYLES.applyButton, STYLES.flex]} label="Apply" />
        <Button mode="contained" onPress={resetFilters} buttonColor={colors.card} style={STYLES.flex} label="Reset" />
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
  appliedFilters: selectAssetEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (query) => dispatch(startAssetEventsFetch(query)),
  updateEventFilters: (filters) => dispatch(updateAssetEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailEventFiltersScreen);
