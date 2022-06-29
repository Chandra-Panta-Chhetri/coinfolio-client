import React from "react";
import { EventFilters } from "../../shared-components";
import { connect } from "react-redux";
import { selectEventFilters, startEventsFetch, updateEventFilters } from "../../redux/discover";

const DiscoverEventFiltersScreen = ({ fetchEvents, updateEventFilters, navigation, appliedFilters }) => {
  const onApplyFilters = (filters) => {
    updateEventFilters(filters);
    fetchEvents();
    navigation.navigate("Discover", { screen: "Events" });
  };

  return <EventFilters defaultFilters={appliedFilters} onApplyFilters={onApplyFilters} />;
};

const mapStateToProps = (state) => ({
  appliedFilters: selectEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startEventsFetch()),
  updateEventFilters: (filters) => dispatch(updateEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverEventFiltersScreen);
