import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { useHiddenFABOnScroll } from "../../hooks";
import { connect } from "react-redux";
import {
  startEventsFetch,
  selectEvents,
  selectIsLoadingNewsData
} from "../../redux/news";
import Reanimated from "react-native-reanimated";
import { LATEST_EVENTS_CONSTANTS } from "../../constants";
import { EventItem, EventItemSkeleton } from "./components";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);
const DUMMY_SKELETON_ARRAY = Array(LATEST_EVENTS_CONSTANTS.NUM_TO_SHOW).fill(
  "1"
);

const LatestEventsScreen = ({ navigation, fetchEvents, events, isLoading }) => {
  const navigateToFiltersScreen = () =>
    navigation.navigate("SelectEventFilters");

  const { Fab, scrollHandler } = useHiddenFABOnScroll({
    icon: "filter-outline",
    onFABClick: navigateToFiltersScreen
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {isLoading && events.length === 0 ? (
        <AnimatedFlatList
          onScroll={scrollHandler}
          data={DUMMY_SKELETON_ARRAY}
          keyExtractor={(s, i) => s + i}
          renderItem={({ index }) => (
            <EventItemSkeleton
              containerStyle={index !== 0 ? styles.itemContainer : null}
            />
          )}
          style={GLOBAL_STYLES.flatListContentContainer}
          contentContainerStyle={styles.eventListContentContainer}
          listKey="EventsSkeletonList"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <AnimatedFlatList
          data={events}
          onScroll={scrollHandler}
          keyExtractor={(e) => e.title}
          renderItem={(props) => (
            <EventItem {...props} navigation={navigation} />
          )}
          listKey="EventsList"
          style={GLOBAL_STYLES.flatListContentContainer}
          contentContainerStyle={styles.eventListContentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Fab />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10
  },
  eventListContentContainer: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

const mapStateToProps = (state) => ({
  events: selectEvents(state),
  isLoading: selectIsLoadingNewsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startEventsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestEventsScreen);
