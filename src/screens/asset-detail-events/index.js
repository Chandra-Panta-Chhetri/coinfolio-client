import React, { useEffect } from "react";
import { EventsList } from "../../shared-components";

const AssetDetailEventsScreen = () => {
  useEffect(() => {
    console.log("asset detail events screen mounted");
  }, []);

  return (
    <EventsList
      isLoading
      isLoadingMore={false}
      hasMoreToFetch={false}
      events={[]}
      fetchMore={() => console.log("fetching more")}
      onFABClick={() => console.log("fab button clicked")}
    />
  );
};

export default AssetDetailEventsScreen;
