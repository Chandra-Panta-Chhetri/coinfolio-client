import { EventFilters } from "../../shared-components";
import React from "react";
import { EVENTS_CONSTANTS } from "../../constants";

const AssetDetailEventFiltersScreen = ({
  navigation,
  appliedFilters = {
    dateRange: {
      start: null,
      end: null
    },
    showOnly: EVENTS_CONSTANTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: EVENTS_CONSTANTS.NUM_TO_SHOW
  }
}) => {
  const onApplyFilters = (filters) => {
    console.log(filters);
    // updateEventFilters(filters);
    // fetchEvents();
    navigation.navigate("AssetDetail", { screen: "AssetDetailEvents" });
  };

  return <EventFilters defaultFilters={appliedFilters} onApplyFilters={onApplyFilters} />;
};

export default AssetDetailEventFiltersScreen;
