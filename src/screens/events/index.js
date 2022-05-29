import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { useHiddenFABOnScroll } from "../../hooks";
import { connect } from "react-redux";
import {
  startEventsFetch,
  selectEvents,
  selectIsLoadingEvents,
  selectIsLoadingMoreEvents,
  selectHasMoreEvents,
  startNextEventsFetch
} from "../../redux/discover";
import { EVENTS_CONSTANTS } from "../../constants";
import { EventItem, EventItemSkeleton } from "./components";
import { InfiniteScroll } from "../../shared-components";

const renderEventSkeleton = ({ index }) => (
  <EventItemSkeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const renderEventItem = ({ item, index }) => <EventItem key={item.id.toString()} event={item} index={index} />;

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

  const { Fab, scrollHandler } = useHiddenFABOnScroll({
    icon: "filter-outline",
    onFABClick: navigateToFiltersScreen
  });

  useEffect(() => {
    //fetchEvents();
  }, []);

  return (
    <>
      <InfiniteScroll
        isLoading={isLoading}
        data={events}
        numSkeletons={EVENTS_CONSTANTS.NUM_TO_SHOW}
        isLoadingMore={isLoadingMore}
        hasMoreToFetch={hasMoreToFetch}
        renderDataItem={renderEventItem}
        renderSkeleton={renderEventSkeleton}
        contentContainerStyle={STYLES.eventsList}
        onEndReached={fetchMoreEvents}
        style={GLOBAL_STYLES.flatListContentContainer}
        onScroll={scrollHandler}
      />
      <Fab />
    </>
  );
};

const STYLES = StyleSheet.create({
  eventsList: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

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
