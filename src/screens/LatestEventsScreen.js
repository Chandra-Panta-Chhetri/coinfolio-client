import React, { useEffect } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
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

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const LatestEventsScreen = ({ navigation, fetchEvents, events, isLoading }) => {
  const dummySkeletonArray = Array(
    CONSTANTS.LATEST_EVENTS.NUM_EVENTS_TO_SHOW
  ).fill("1");

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
            <Text style={{ borderWidth: 1, height: 100 }}>Hi</Text>
          )}
          listKey="EventsSkeletonList"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <AnimatedFlatList
          data={events}
          keyExtractor={(e) => e.title}
          renderItem={(props) => null}
          listKey="EventsList"
          showsVerticalScrollIndicator={false}
        />
      )}
      {FAB}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1
  }
});

const mapStateToProps = (state) => ({
  events: selectEvents(state),
  isLoading: selectIsLoadingNewsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (filters) => dispatch(startEventsFetch(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestEventsScreen);
