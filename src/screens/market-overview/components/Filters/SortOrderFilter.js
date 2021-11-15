import React, { useState } from "react";
import { connect } from "react-redux";
import { selectSortOrderFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { FilterBadge } from "../../../../shared-components";

const SortOrderFilter = ({ activeFilter, updateMarketFilters }) => {
  console.log(activeFilter);

  const onPress = () => {
    console.log("Sort Order Filter clicked");
  };

  return (
    <FilterBadge
      label={`Sorting in`}
      onPress={onPress}
      containerStyle={{ marginRight: 10, flexGrow: 1 }}
    />
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectSortOrderFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortOrder: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortOrderFilter);
