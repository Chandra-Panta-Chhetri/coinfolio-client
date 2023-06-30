import React from "react";
import { connect } from "react-redux";
import { selectAssetEventFilters, fetchAssetEvents, updateAssetEventFilters } from "../../redux/asset-detail";
import { EventFilters } from "../../components";
import SCREEN_NAMES from "../../navigators/screen-names";

const AssetDetailEventFiltersScreen = ({ fetchEvents, updateEventFilters, activeFilters, route }) => {
  return (
    <EventFilters
      fetchEvents={fetchEvents}
      updateEventFilters={updateEventFilters}
      activeFilters={activeFilters}
      route={route}
      screenName={SCREEN_NAMES.ASSET_DETAIL_EVENT_FILTERS}
    />
  );
};

const mapStateToProps = (state) => ({
  activeFilters: selectAssetEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (query) => dispatch(fetchAssetEvents(query)),
  updateEventFilters: (filters) => dispatch(updateAssetEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailEventFiltersScreen);
