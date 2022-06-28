import React, { useEffect } from "react";
import { NewsList } from "../../shared-components";

const AssetDetailNewsScreen = ({}) => {
  useEffect(() => {
    console.log("asset detail news screen mounted");
  }, []);

  return (
    <NewsList
      isLoading
      hasMoreToFetch={false}
      isLoadingMore={false}
      onFilterChange={(filter) => console.log("onFilterChange", filter)}
      fetchMore={() => console.log("fetching more")}
      news={[]}
    />
  );
};

export default AssetDetailNewsScreen;
