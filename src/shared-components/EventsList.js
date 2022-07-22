import React from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../styles";
import { useHiddenFABOnScroll } from "../hooks";
import { EVENTS_CONSTANTS } from "../constants";
import EventItem from "./EventItem";
import EventItemSkeleton from "./EventItem/Skeleton";
import InfiniteScroll from "./InfiniteScroll";

const renderEventSkeleton = ({ index }) => (
  <EventItemSkeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const renderEventItem = ({ item, index }) => <EventItem key={item.id.toString()} event={item} index={index} />;

const EventsList = ({ onFABClick, events, isLoading, fetchMore, isLoadingMore, hasMoreToFetch }) => {
  const { Fab, scrollHandler } = useHiddenFABOnScroll({
    icon: "filter-outline",
    onFABClick
  });

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
        onEndReached={fetchMore}
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

export default EventsList;
