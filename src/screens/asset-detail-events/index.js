import React, { useEffect } from "react";
import { EventsList } from "../../shared-components";

const AssetDetailEventsScreen = ({ navigation }) => {
  useEffect(() => {
    console.log("asset detail events screen mounted");
  }, []);

  const navigateToFilters = () => navigation.navigate("AssetDetailEventFilters");

  return (
    <EventsList
      isLoading
      isLoadingMore={false}
      hasMoreToFetch={false}
      events={[]}
      fetchMore={() => console.log("fetching more")}
      onFABClick={navigateToFilters}
    />
  );
};

export default AssetDetailEventsScreen;
