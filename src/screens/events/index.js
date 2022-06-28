import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  startEventsFetch,
  selectEvents,
  selectIsLoadingEvents,
  selectIsLoadingMoreEvents,
  selectHasMoreEvents,
  startNextEventsFetch
} from "../../redux/discover";
import { EventsList } from "../../shared-components";

const EventsScreen = ({
  navigation,
  fetchEvents,
  events,
  isLoading,
  fetchMoreEvents,
  isLoadingMore,
  hasMoreToFetch
}) => {
  const navigateToFiltersScreen = () => navigation.navigate("SelectEventFilters");

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsList
      onFABClick={navigateToFiltersScreen}
      fetchMore={fetchMoreEvents}
      hasMoreToFetch={hasMoreToFetch}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      events={events}
    />
  );
};

const mapStateToProps = (state) => ({
  events: selectEvents(state),
  isLoading: selectIsLoadingEvents(state),
  isLoadingMore: selectIsLoadingMoreEvents(state),
  hasMoreToFetch: selectHasMoreEvents(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startEventsFetch()),
  fetchMoreEvents: () => dispatch(startNextEventsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
