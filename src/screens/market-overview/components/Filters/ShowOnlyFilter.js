import React, { useState } from "react";
import { connect } from "react-redux";
import { selectShowOnlyFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { FilterBadge } from "../../../../shared-components";

const ShowOnlyFilter = ({ activeFilter, updateMarketFilters }) => {
  const onPress = () => {
    console.log("Show Only Filter clicked");
  };

  return (
    <FilterBadge
      label={`Showing ${activeFilter}`}
      onPress={onPress}
      containerStyle={{ marginRight: 10, flexGrow: 1 }}
    />
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectShowOnlyFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortOrder: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowOnlyFilter);
