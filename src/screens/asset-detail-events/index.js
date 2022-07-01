import React, { useEffect } from "react";
import { EventsList } from "../../shared-components";
import { connect } from "react-redux";
import {
  selectAssetEvents,
  selectHasMoreAssetEvents,
  selectIsLoadingAssetEvents,
  selectIsLoadingMoreAssetEvents,
  startAssetEventsFetch,
  startNextAssetEventsFetch
} from "../../redux/asset-detail";

const AssetDetailEventsScreen = ({
  navigation,
  fetchEvents,
  events,
  isLoading,
  fetchMoreEvents,
  isLoadingMore,
  hasMoreToFetch
}) => {
  useEffect(() => {
    console.log("asset detail events screen mounted");
    //fetchEvents()
  }, []);

  const navigateToFilters = () => navigation.navigate("AssetDetailEventFilters");

  return (
    <EventsList
      fetchMore={fetchMoreEvents}
      hasMoreToFetch={hasMoreToFetch}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      events={events}
      onFABClick={navigateToFilters}
    />
  );
};

const mapStateToProps = (state) => ({
  events: selectAssetEvents(state),
  isLoading: selectIsLoadingAssetEvents(state),
  isLoadingMore: selectIsLoadingMoreAssetEvents(state),
  hasMoreToFetch: selectHasMoreAssetEvents(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startAssetEventsFetch()),
  fetchMoreEvents: () => dispatch(startNextAssetEventsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailEventsScreen);
