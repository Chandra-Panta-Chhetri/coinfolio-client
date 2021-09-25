import React from "react";
import { StyleSheet, View } from "react-native";
import DropDown from "../components/shared/DropDown";
import { connect } from "react-redux";
import {
  startEventsFetch,
  updateEventFilters
} from "../redux/news/news.actions";
import { selectEventFilters } from "../redux/news/news.selectors";
import GlobalStyles from "../GlobalStyles";
import { Button, Text } from "react-native-paper";
import CONSTANTS from "../Constants";

const SelectEventFiltersScreen = ({
  fetchEvents,
  updateEventFilters,
  navigation,
  eventFilters
}) => {
  const onButtonPress = () => {
    // fetchEvents();
    navigation.navigate("News", { screen: "LatestEvents" });
  };

  const onShowOnlyDropDownSelect = (_, selectedIndex) =>
    updateEventFilters({ showOnly: selectedIndex });

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
            initialSelectedIndex={eventFilters.showOnly}
          />
        </View>
      </View>
      <Button
        labelStyle={GlobalStyles.button}
        mode="contained"
        onPress={onButtonPress}
      >
        Apply
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  filterLabel: {
    marginBottom: 5
  }
});

const mapStateToProps = (state) => ({
  eventFilters: selectEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startEventsFetch()),
  updateEventFilters: (filters) => dispatch(updateEventFilters(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectEventFiltersScreen);
