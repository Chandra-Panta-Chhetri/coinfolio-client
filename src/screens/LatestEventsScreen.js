import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import GlobalStyles from "../GlobalStyles";
import useHiddenFABOnScroll from "../hooks/useHiddenFABOnScroll";
import { connect } from "react-redux";
import { startEventsFetch } from "../redux/news/news.actions";
import {
  selectIsLoadingNewsData,
  selectEvents
} from "../redux/news/news.selectors";
import Reanimated from "react-native-reanimated";
import CONSTANTS from "../Constants";
import EventDetail from "../components/events/EventDetail";
import EventDetailSkeleton from "../components/events/EventDetailSkeleton";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);
const dummySkeletonArray = Array(
  CONSTANTS.LATEST_EVENTS.NUM_EVENTS_TO_SHOW
).fill("1");

const LatestEventsScreen = ({ navigation, fetchEvents, events, isLoading }) => {
  const navigateToFiltersScreen = () =>
    navigation.navigate("SelectEventFilters");

  const { FAB, scrollHandler } = useHiddenFABOnScroll({
    icon: "filter-outline",
    onFABClick: navigateToFiltersScreen
  });

  useEffect(() => {
    //fetchEvents();
  }, []);

  return (
    <>
      {isLoading && events.length === 0 ? (
        <AnimatedFlatList
          onScroll={scrollHandler}
          data={dummySkeletonArray}
          keyExtractor={(s, i) => s + i}
          renderItem={({ index }) => (
            <EventDetailSkeleton
              containerStyle={index !== 0 ? styles.itemContainer : null}
            />
          )}
          style={GlobalStyles.flatListContentContainer}
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
            <EventDetail {...props} navigation={navigation} />
          )}
          listKey="EventsList"
          style={GlobalStyles.flatListContentContainer}
          contentContainerStyle={styles.eventListContentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      {FAB}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10
  },
  eventListContentContainer: {
    ...GlobalStyles.screenContainer,
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
