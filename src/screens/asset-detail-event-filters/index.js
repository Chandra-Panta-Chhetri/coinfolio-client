import { EventFilters } from "../../shared-components";
import React from "react";
import { connect } from "react-redux";
import { selectAssetEventFilters, startAssetEventsFetch, updateAssetEventFilters } from "../../redux/asset-detail";

const AssetDetailEventFiltersScreen = ({ fetchEvents, updateEventFilters, navigation, appliedFilters }) => {
  const onApplyFilters = (filters) => {
    updateEventFilters(filters);
    fetchEvents();
    navigation.navigate("AssetDetail", { screen: "AssetDetailEvents" });
  };

  return <EventFilters defaultFilters={appliedFilters} onApplyFilters={onApplyFilters} />;
};

const mapStateToProps = (state) => ({
  appliedFilters: selectAssetEventFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startAssetEventsFetch()),
  updateEventFilters: (filters) => dispatch(updateAssetEventFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailEventFiltersScreen);
