import React from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { useHiddenFABOnScroll } from "../../hooks";
import Event from "./Event";
import InfiniteScroll from "../InfiniteScroll";
import EVENTS_FILTERS from "./filters";

const renderEventSkeleton = ({ index }) => (
  <Event.Skeleton containerStyle={index !== 0 ? GLOBAL_STYLES.cardMargin : null} />
);

const renderEvent = ({ item, index }) => <Event key={item?.id} event={item} index={index} />;

const Events = ({ onFABClick, events, isLoading, fetchMore, isLoadingMore, hasMoreToFetch }) => {
  const { Fab, scrollHandler } = useHiddenFABOnScroll({
    icon: "filter-outline",
    onFABClick
  });

  return (
    <>
      <InfiniteScroll
        isLoading={isLoading}
        data={events}
        numSkeletons={EVENTS_FILTERS.NUM_SKELETON_LOADERS}
        isLoadingMore={isLoadingMore}
        hasMoreToFetch={hasMoreToFetch}
        renderDataItem={renderEvent}
        renderSkeleton={renderEventSkeleton}
        contentContainerStyle={STYLES.events}
        onEndReached={fetchMore}
        style={GLOBAL_STYLES.flatListContentContainer}
        onScroll={scrollHandler}
      />
      <Fab />
    </>
  );
};

const STYLES = StyleSheet.create({
  events: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

export default Events;
