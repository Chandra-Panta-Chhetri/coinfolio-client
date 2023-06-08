import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchEvents,
  selectEvents,
  selectIsLoadingEvents,
  selectIsLoadingMoreEvents,
  selectHasMoreEvents,
  fetchMoreEvents
} from "../../redux/discover";
import { Events } from "../../components";
import SCREEN_NAMES from "../../navigators/screen-names";

const EventsScreen = ({
  navigation,
  fetchEvents,
  events,
  isLoadingEvents,
  fetchMoreEvents,
  isLoadingMoreEvents,
  hasMoreEventsToFetch
}) => {
  const navigateToFiltersScreen = () => navigation?.navigate(SCREEN_NAMES.DISCOVER_EVENT_FILTERS);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Events
      onFABClick={navigateToFiltersScreen}
      fetchMore={fetchMoreEvents}
      hasMoreToFetch={hasMoreEventsToFetch}
      isLoading={isLoadingEvents}
      isLoadingMore={isLoadingMoreEvents}
      events={events}
    />
  );
};

const mapStateToProps = (state) => ({
  events: selectEvents(state),
  isLoadingEvents: selectIsLoadingEvents(state),
  isLoadingMoreEvents: selectIsLoadingMoreEvents(state),
  hasMoreEventsToFetch: selectHasMoreEvents(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchMoreEvents: () => dispatch(fetchMoreEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
