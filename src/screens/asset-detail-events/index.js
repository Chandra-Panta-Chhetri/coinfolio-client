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
import { lowerCaseAndHyphenate } from "../../utils";

const AssetDetailEventsScreen = ({
  navigation,
  fetchEvents,
  events,
  isLoading,
  fetchMoreEvents,
  isLoadingMore,
  hasMoreToFetch,
  route
}) => {
  const { params } = route;
  const query = { coins: lowerCaseAndHyphenate(params.name) };

  useEffect(() => {
    console.log(params, "in asset event");
    // fetchEvents(query);
  }, []);

  const navigateToFilters = () => navigation.navigate("AssetDetailEventFilters", query);

  const fetchMore = () => fetchMoreEvents(query);

  return (
    <EventsList
      fetchMore={fetchMore}
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
  fetchEvents: (query) => dispatch(startAssetEventsFetch(query)),
  fetchMoreEvents: (query) => dispatch(startNextAssetEventsFetch(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailEventsScreen);
