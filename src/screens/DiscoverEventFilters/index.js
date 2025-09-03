import React from "react";
import { connect } from "react-redux";
import { selectEventFilters, fetchEvents, updateEventFilters } from "../../redux/discover";
import { EventFilters } from "../../components";
import SCREEN_NAMES from "../../navigators/screen-names";

const DiscoverEventFiltersScreen = ({ fetchEvents, updateEventFilters, activeFilters }) => {
  return (
    <EventFilters
      fetchEvents={fetchEvents}
      updateEventFilters={updateEventFilters}
      activeFilters={activeFilters}
      screenName={SCREEN_NAMES.DISCOVER_EVENT_FILTERS}
    />
  );
};

const mapStateToProps = (state) => ({
  activeFilters: selectEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  updateEventFilters: (filters) => dispatch(updateEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverEventFiltersScreen);
