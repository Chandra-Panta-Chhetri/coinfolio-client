import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDown from "../components/shared/DropDown";
import { connect } from "react-redux";
import {
  startEventsFetch,
  updateEventFilters
} from "../redux/news/news.actions";
import { selectEventFilters } from "../redux/news/news.selectors";
import GlobalStyles from "../GlobalStyles";
import { Button, Text, useTheme } from "react-native-paper";
import CONSTANTS from "../Constants";

const SelectEventFiltersScreen = ({
  fetchEvents,
  updateEventFilters,
  navigation,
  appliedFilters
}) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState(appliedFilters);

  const applyFilter = () => {
    updateEventFilters(filters);
    fetchEvents();
    navigation.navigate("News", { screen: "LatestEvents" });
  };

  const onShowOnlyDropDownSelect = (_, selectedIndex) =>
    setFilters({ ...filters, showOnly: selectedIndex });

  const resetFilters = () => {
    setFilters({
      dateRange: null,
      showOnly: CONSTANTS.LATEST_EVENTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
      limit: CONSTANTS.LATEST_EVENTS.NUM_EVENTS_TO_SHOW
    });
  };

  return (
    <View style={[GlobalStyles.screenContainer, styles.flex]}>
      <View style={styles.flex}>
        <View style={GlobalStyles.componentContainer}>
          <Text style={[GlobalStyles.subheading, styles.filterLabel]}>
            Date range
          </Text>
        </View>
        <View>
          <Text style={[GlobalStyles.subheading, styles.filterLabel]}>
            Show only
          </Text>
          <DropDown
            onSelect={onShowOnlyDropDownSelect}
            options={CONSTANTS.LATEST_EVENTS.SHOW_ONLY_FILTERS}
            selectedIndex={filters.showOnly}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          labelStyle={GlobalStyles.button}
          mode="contained"
          onPress={applyFilter}
          style={[styles.applyButton, styles.flex]}
        >
          Apply
        </Button>
        <Button
          labelStyle={GlobalStyles.button}
          mode="contained"
          onPress={resetFilters}
          color={colors.card}
          style={styles.flex}
        >
          Reset
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  filterLabel: {
    marginBottom: 5
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectEventFiltersScreen);
