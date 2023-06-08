import React, { useEffect } from "react";
import { Events } from "../../components";
import { connect } from "react-redux";
import {
  selectAssetEvents,
  selectHasMoreAssetEvents,
  selectIsLoadingAssetEvents,
  selectIsLoadingMoreAssetEvents,
  fetchAssetEvents,
  fetchMoreAssetEvents
} from "../../redux/asset-detail";
import { lowerCaseAndHyphenate } from "../../utils";
import SCREEN_NAMES from "../../navigators/screen-names";

const AssetDetailEventsScreen = ({
  navigation,
  fetchEvents,
  events,
  isLoadingEvents,
  fetchMoreEvents,
  isLoadingMoreEvents,
  hasMoreToFetch,
  route
}) => {
  const { params } = route;
  const query = { coins: lowerCaseAndHyphenate(params?.name) };

  useEffect(() => {
    fetchEvents(query);
  }, []);

  const navigateToFilters = () => navigation.navigate(SCREEN_NAMES.ASSET_DETAIL_EVENT_FILTERS, query);

  const fetchMore = () => fetchMoreEvents(query);

  return (
    <Events
      fetchMore={fetchMore}
      hasMoreToFetch={hasMoreToFetch}
      isLoading={isLoadingEvents}
      isLoadingMore={isLoadingMoreEvents}
      events={events}
      onFABClick={navigateToFilters}
    />
  );
};

const mapStateToProps = (state) => ({
  events: selectAssetEvents(state),
  isLoadingEvents: selectIsLoadingAssetEvents(state),
  isLoadingMoreEvents: selectIsLoadingMoreAssetEvents(state),
  hasMoreToFetch: selectHasMoreAssetEvents(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (query) => dispatch(fetchAssetEvents(query)),
  fetchMoreEvents: (query) => dispatch(fetchMoreAssetEvents(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailEventsScreen);
